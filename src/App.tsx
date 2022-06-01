import "./App.css";
import Game from "./components/game/Game";
import Home from "./components/home/Home";
import { Route, Routes } from "react-router-dom";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/game/:id" element={<Game />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
