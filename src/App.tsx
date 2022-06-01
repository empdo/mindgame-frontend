import "./App.css";
import Game from "./components/game/Game";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/settings/Settings";
import React from "react";
import classNames from "classnames";

export const PopupContext = React.createContext<(message: string) => void>(
  () => {}
);

function App() {
  const [message, setMessage] = React.useState("");

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 2500);
  };

  const popupClasses = ["popup", { "popup-visible": message }];

  return (
    <PopupContext.Provider value={showMessage}>
      <div className="App">
        <Routes>
          <Route path="/game/:id" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<Home />} />
        </Routes>
        <div className={classNames(popupClasses)}>{message}</div>
      </div>
    </PopupContext.Provider>
  );
}

export default App;
