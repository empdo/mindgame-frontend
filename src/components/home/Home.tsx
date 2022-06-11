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
              <div className="lobby" key={lobby.id}>
                <div className="lobby-players">{lobby.players.toString()}</div>
                <h2 onClick={() => navigate("/game/" + lobby.id)}>Join</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const Navbar = () => {
    const [isPressed, setIsPressed] = React.useState(false);
    React.useEffect(() => {
      document.body.style.overflow = isPressed ? "hidden" : "scroll";
    }, [isPressed]);

    if (window.innerWidth < 960) {
      return (
        <>
          {isPressed && (
            <div id="navbar-content" onClick={() => setIsPressed(false)}>
              <h2>Mind Game</h2>
              <span />
              <h3
                className="clickable underline"
                onClick={() => {
                  setIsPressed(false);
                  window.setTimeout(() => {
                    window.location.assign("/#rules");
                  }, 250);
                }}
              >
                Rules
              </h3>
              <h3
                className="clickable underline"
                onClick={() => {
                  setIsPressed(false);
                  window.setTimeout(() => {
                    window.location.assign("/#lobbies");
                  }, 250);
                }}
              >
                Lobbies
              </h3>
              <h3
                className="clickable underline "
                onClick={() => {
                  setIsPressed(false);
                  navigate("/settings");
                }}
              >
                Settings
              </h3>
            </div>
          )}

          <nav>
            <div
              onClick={() => {
                setIsPressed(true);
              }}
              id="hamburger"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </>
      );
    }

    return (
      <nav>
        <h2>Mind Game</h2>
        <span />
        <a href="#rules">
          <h3>Rules</h3>
        </a>
        <a href="#lobbies">
          <h3>Lobbies</h3>
        </a>
        <h3 className="clickable" onClick={() => navigate("/settings")}>
          Settings
        </h3>
      </nav>
    );
  };

  return (
    <>
      <Navbar />
      <div className="home">
        <section>
          <h1 id="rules">Welcome to Mind Game</h1>
          <p>
            The Mind is a card game in which players must work together to play
            their cards in ascending order from 0 to 100 without talking.
          </p>
          <p>
            The game starts with each player being dealt one card, one more card
            will be handed out to each players for each level. The players must
            then play their cards in ascending order, one at a time. If a player
            plays a card out of order, the team loses a life.
          </p>
          <p>
            If the team runs out of lives, they lose the game. If the team
            completes enough levels, they win the game. With 2 players, 10
            levels is required to win, with 3 players, 9 levels and with 4
            players 8 levels.
          </p>
          <p>At levels 3, 6 and 9, one life is given out to the team.</p>
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
