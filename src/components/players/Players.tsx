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
            <div key={player.id}>
              <div id="avatar-container">
                {player.avatarIndex && (
                  <img
                    src={"/images/avatar" + player.avatarIndex + ".png"}
                    className="animated"
                    onAnimationEnd={(e) => {
                      e.currentTarget.classList.remove("animated");
                    }}
                    alt=""
                  />
                )}
              </div>
              <div id="player-info-container">
                <h3>
                  {player.name} {player.local && "(you)"}
                  {gamedata.started && !player.local && (
                    <div id="player-card-holder">
                      <p>{player.cards.length}x</p>
                      <span className="player-card"></span>
                    </div>
                  )}
                </h3>
              </div>
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
