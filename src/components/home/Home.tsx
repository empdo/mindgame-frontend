import React from "react";
import "./home.scss";
import { Lobby } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import generateCuid from "cuid";

const Home = () => {
  const [lobbies, setLobbies] = React.useState<Lobby[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getLobbies = async () => {
      let response = await fetch("https://mind.essung.dev/api/lobbies");
      const data = await response.json();
      console.log(data);
      setLobbies(data);
    };

    getLobbies();
  }, []);

  const Lobbies = () => {
    return (
      <div id="lobby">
        <a href={"/game/" + generateCuid()}>
          <h1>Create a lobby</h1>
        </a>
        <div id="lobbies-container">
          {lobbies.map((lobby) => {
            return (
              <div className="lobby">
                <div className="lobby-players">{lobby.players.toString()}</div>
                <h2 onClick={() => navigate("/game/" + lobby.id)}>Join</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <nav>
        <h2>Mind Game</h2>
        <span />
        <a href="#">
          <h3>Rules</h3>
        </a>
        <a href="#lobbies">
          <h3>Lobbies</h3>
        </a>
        <h3 className="clickable" onClick={() => navigate("/settings")}>
          Settings
        </h3>
      </nav>
      <div className="home">
        <section>
          <h1 id="rules">Welcome to Mind Game</h1>
          <p>
            The Mind is a card game in which players must work together to play
            their cards in ascending order from 1 to 100 without talking.
          </p>
          <p>
            The game starts with each player being dealt one card. The players
            must then play their cards in ascending order, one at a time. If a
            player plays a card out of order, the team loses a life.
          </p>
          <p>
            If the team runs out of lives, they lose the game. If the team
            completes all the levels, they win the game.
          </p>
        </section>
        <section id="lobbies">
          <h1>Lobbies</h1>
          <Lobbies />
        </section>
      </div>
    </>
  );
};

export default Home;
