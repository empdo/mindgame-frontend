import React from "react";
import { ActionType, GameEvent, LobbyState } from "../../interfaces";
import { useParams } from "react-router-dom";
import Players from "../players/Players";
import Lobby from "../lobby/Lobby";
import "./game.scss";
import Cards from "./../cards/Cards";
import { getToken } from "../../api";
import { useNavigate } from "react-router-dom";

//import AnimationEnd from "./AnimationEnd";

const defaultLobbyState: LobbyState = {
  players: [],
  started: false,
  ready: false,
  dealtCards: [],
  yourCards: [],
  lives: 0,
  lost: false,
  round: 0,
};

export const GameContext = React.createContext<LobbyState>(defaultLobbyState);

const gameStateReducer = <T extends GameEvent>(
  state: LobbyState,
  action: T
): LobbyState => {
  switch (action.type) {
    case ActionType.PlayerJoin:
      return {
        ...state,
        players: action.data,
        localPlayer: action.data.find((player) => player.local),
      };
    case ActionType.Started:
      return { ...state, started: action.data };
    case ActionType.DealtCards:
      return { ...state, dealtCards: action.data };
    case ActionType.Cards:
      if (!state.localPlayer) {
        return state;
      }

      return {
        ...state,
        round: action.data[state.localPlayer.id].length,
        yourCards: action.data[state.localPlayer.id].sort(function (a, b) {
          return a > b ? -1 : 1;
        }),
        players: state.players.map((player) => {
          player.cards = action.data[player.id] || [];
          return player;
        }),
      };

    case ActionType.Lives:
      return { ...state, lives: action.data };
    case ActionType.Lost:
      return { ...state, lost: action.data };
  }
};

const Game = () => {
  let [ws, setWs] = React.useState<WebSocket | undefined>();
  const navigate = useNavigate();

  const [gameReducer, handleGameReducer] = React.useReducer(
    gameStateReducer,
    defaultLobbyState
  );

  const { id } = useParams();
  const url = `wss://mind.essung.dev/api/lobby/${id}/`;
  //const url = `ws://localhost:10406/api/lobby/${id}/`;

  React.useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!token) {
      getToken(token || undefined);
    }

    if (id && !ws) {
      const ws = new WebSocket(url + "?token=" + token);
      ws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        handleGameReducer(data);
      });

      setWs(ws);
    }
  }, [id, url, ws]);
  if (!id) return <>Id missing from params</>;

  const toggleReady = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: 1 }));
    }
  };
  const sendCard = (card: number) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 2, data: card }));
    }
  };

  const Lives = () => {
    const hearts = [];
    for (var i = 0; i < gameReducer.lives; i++) {
      hearts.push(
        <img
          src="/favorite_FILL1_wght400_GRAD0_opsz48.svg"
          alt=" "
          key={"heart-" + i}
        />
      );
    }
    const darkHearts = [];
    for (i = 0; i < gameReducer.players.length - gameReducer.lives; i++) {
      darkHearts.push(
        <img
          src="/favorite_FILL1_wght400_GRAD0_opsz48.svg"
          id="dark"
          alt=" "
          key={"darkheart-" + i}
        />
      );
    }
    return (
      <>
        {hearts} {darkHearts}
      </>
    );
  };

  return (
    <>
      <GameContext.Provider value={gameReducer}>
        <div id="top-bar">
          <Players />
          {gameReducer.started ? (
            <Lives />
          ) : (
            gameReducer.players.length > 0 && (
              <img
                src="/settings_FILL0_wght400_GRAD0_opsz48.svg"
                className="settings-icon"
                onClick={() => navigate("/settings")}
                alt="settings"
              />
            )
          )}
        </div>
        {gameReducer.started ? (
          <Cards sendCard={sendCard} />
        ) : (
          <Lobby toggle={toggleReady} />
        )}
      </GameContext.Provider>
    </>
  );
};

export default Game;
