import React from "react";
import "./cards.scss";
import { GameContext } from "./Game";

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
        {gameData.dealtCards.map((card) => {
          return (
            <div className="card">
              <h2>{card}</h2>
            </div>
          );
        })}
      </>
    );
  };

  const YourCards = () => {
    const [hasScrolled, setHasScrolled] = React.useState(false);
    const cardsContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      window.setTimeout(() => {
        if (cardsContainerRef.current) {
          console.log("asd");
          cardsContainerRef.current.scrollTo({
            left: -cardsContainerRef.current.scrollWidth,
          });
        }
      }, 0);
    }, [cardsContainerRef]);

    const style = {
      marginLeft: hasScrolled
        ? "-2rem"
        : -window.innerWidth / gameData.yourCards.length + "px",
    };

    return (
      <div
        id="your-cards"
        onScroll={(e) => {
          setHasScrolled(!e.currentTarget.scrollLeft ? false : true);
        }}
        ref={cardsContainerRef}
      >
        {gameData.yourCards.map((card, index) => {
          let _style = {};

          if (cardsContainerRef.current) {
            _style =
              cardsContainerRef.current.scrollWidth >= window.innerWidth
                ? style
                : {};
          }

          console.log(index, gameData.yourCards.length);
          return (
            <div
              key={index}
              className="card"
              style={_style}
              //              style={style}
              onClick={() => {
                props.sendCard(card);
                gameData.yourCards = gameData.yourCards.filter(
                  (_card) => _card !== card
                );
              }}
            >
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
          <span id="spacer" />
          <YourCards />
        </div>
      )}
    </>
  );
};

export default Cards;
