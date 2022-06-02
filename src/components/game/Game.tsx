import React from "react";
import { ActionType, GameEvent, LobbyState } from "../../interfaces";
import { useParams } from "react-router-dom";
import Players from "../players/Players";
import Lobby from "../lobby/Lobby";
import "./game.scss";
import Cards from "./../cards/Cards";
import { getToken, getWs } from "../../api";
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
      return { ...state, started: action.data, lost: false };
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
      return { ...state, lost: action.data, started: false };
  }
};

const Game = () => {
  let [ws, setWs] = React.useState<WebSocket | undefined>();
  const navigate = useNavigate();

  const [gameReducer, handleGameReducer] = React.useReducer(
    gameStateReducer,
    defaultLobbyState
  );

  const [lost, setLost] = React.useState(false);
  React.useEffect(() => {
    if (gameReducer.lost) {
      window.setTimeout(() => {
        setLost(false);
      }, 2500);

      setLost(true);
    }
  }, [gameReducer.lost]);

  const { id } = useParams();
  const url = `wss://mind.essung.dev/api/lobby/${id}/`;
  //const url = `ws://localhost:10406/api/lobby/${id}/`;

  React.useEffect(() => {
    let token = localStorage.token;

    window.addEventListener("storage", (e) => {
      token = localStorage.token;
      setWs(getWs(url, handleGameReducer, token));
    });

    if (!token) {
      getToken(token || undefined);
    }
    if (id && !ws && token) {
      setWs(getWs(url, handleGameReducer, token));
    }
  }, [id, url, ws]);

  if (!id) return <>Id missing from params</>;
  if (!ws) return <>Loading...</>;

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
    for (i = 0; i < gameReducer.players.length - gameReducer.lives; i++) {
      hearts.push(
        <img
          src="/favorite_FILL1_wght400_GRAD0_opsz48.svg"
          id="dark"
          alt=" "
          key={"darkheart-" + i}
        />
      );
    }
    return <>{hearts}</>;
  };

  const MessageThing = () => {
    return (
      <div id="message-thing">
        <h1>You lost!</h1>
      </div>
    );
  };

  return (
    <>
      {lost ? (
        <MessageThing />
      ) : (
        <GameContext.Provider value={gameReducer}>
          <div id="top-bar">
            <Players />
            {gameReducer.started ? (
              <Lives />
            ) : (
              gameReducer.players.length > 0 && (
                <img
                  src="/settings_FILL0_wght400_GRAD0_opsz48.svg"
                  className="settings-icon clickable"
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
      )}
    </>
  );
};

export default Game;
