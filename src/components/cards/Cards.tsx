import React from "react";
import "./cards.scss";
import { GameContext } from "../game/Game";

const Cards = (props: { sendCard: (card: number) => void }) => {
  const gameData = React.useContext(GameContext);
  const [newRound, setNewRound] = React.useState(true);

  React.useEffect(() => {
    setNewRound(true);
    const sleep = async (duration: number) =>
      await new Promise<void>((resolve) => setTimeout(resolve, duration));

    sleep(3000).then(() => {
      setNewRound(false);
    });
  }, [gameData.round]);

  const DealtCards = () => {
    return (
      <>
        {gameData.dealtCards.map((card, index) => {
          return (
            <div className="card">
              <img
                src={`/images/kort${card % 2 === 0 ? 1 : 2}.png`}
                alt=""
              ></img>
              <h2>{card}</h2>
            </div>
          );
        })}
      </>
    );
  };

  const YourCards = () => {
    const cardsContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      window.setTimeout(() => {
        if (cardsContainerRef.current) {
          cardsContainerRef.current.scrollTo({
            left: -cardsContainerRef.current.scrollWidth,
          });
        }
      }, 0);
    }, []);

    return (
      <div id="your-cards" onScroll={(e) => {}} ref={cardsContainerRef}>
        {gameData.yourCards.map((card, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                props.sendCard(card);
                gameData.yourCards = gameData.yourCards.filter(
                  (_card) => _card !== card
                );
              }}
            >
              <img
                src={`/images/kort${card % 2 === 0 ? 1 : 2}.png`}
                alt=""
                className="card"
              ></img>
              <h2>{card}</h2>
            </div>
          );
        })}
      </div>
    );
  };

  const RoundThing = () => {
    return (
      <div id="newRound">
        <h1>Round {gameData.round}</h1>
      </div>
    );
  };

  return (
    <>
      {newRound ? (
        <RoundThing />
      ) : (
        <div id="main-div">
          <div id="dealt-cards">
            <DealtCards />
          </div>
          <YourCards />
        </div>
      )}
    </>
  );
};

export default Cards;
