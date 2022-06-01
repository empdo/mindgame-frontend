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
            The Mind is more than just a game. It's an experiment, a journey, a
            team experience in which you can't exchange information, yet will
            become one to defeat all the levels of the game.
          </p>
          <p>
            In more detail, the deck contains cards numbered 1-100, and during
            the game you try to complete 12, 10, or 8 levels of play with 2, 3,
            or 4 players. In a level, each player receives a hand of cards equal
            to the number of the level: one card in level 1, two cards in level
            2, etc. Collectively you must play these cards into the center of
            the table on a single discard pile in ascending order but you cannot
            communicate with one another in any way as to which cards you hold.
            You simply stare into one another's eyes, and when you feel the time
            is right, you play your lowest card. If no one holds a card lower
            than what you played, great, the game continues! If someone did, all
            players discard face up all cards lower than what you played, and
            you lose one life.
          </p>
          <p>
            You start the game with a number of lives equal to the number of
            players. Lose all your lives, and you lose the game. You start with
            one shuriken as well, and if everyone wants to use a shuriken, each
            player discards their lowest card face up, giving everyone
            information and getting you closer to completing the level. As you
            complete levels, you might receive a reward of a shuriken or an
            extra life. Complete all the levels, and you win!
          </p>
          <p>
            For an extra challenge, play The Mind in extreme mode with all
            played cards going onto the stack face down. You don't look at the
            cards played until the end of a level, losing lives at that time for
            cards played out of order.
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
