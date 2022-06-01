import React from "react";
import { GameContext } from "../game/Game";
import "./player.scss";

const Players = () => {
  const gamedata = React.useContext(GameContext);
  const players = gamedata.players;

  const GetPlayers = () => {
    return (
      <div id="players-container">
        {players.map((player) => {
          return (
            <div key={player.name}>
              <h3>
                {player.name} {player.local && "(you)"}
                {gamedata.started && !player.local && (
                  <div id="player-card-holder">
                    <>
                      {player.cards.map((card) => {
                        return <span className="player-card"></span>;
                      })}
                    </>
                    <>
                      {Array(gamedata.round - player.cards.length)
                        .fill(undefined)
                        .map(() => {
                          return <span className="player-card played"></span>;
                        })}
                    </>
                  </div>
                )}
              </h3>
              {!gamedata.started && (
                <>
                  <h3>
                    <strong>{player.readyState ? "Ready" : "Not ready"}</strong>
                  </h3>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return <GetPlayers />;
};

export default Players;
