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
        <h3>Rules</h3>
        <a href="#lobbies">
          <h3>Lobbies</h3>
        </a>
        <h3 className="clickable" onClick={() => navigate("/settings")}>
          Settings
        </h3>
      </nav>
      <div className="home">
        <section>
          <p>
            The game is played with two players. The player who has the most
            points at the end of the game wins.
          </p>
          TODO:
          <ul>
            <li>Fixa så att ws sparas nmär man går till settings</li>
          </ul>
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
