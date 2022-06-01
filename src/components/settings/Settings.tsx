import React from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../api";
import { PopupContext } from "../../App";

const Settings = () => {
  let [name, setName] = React.useState(
    window.localStorage.getItem("name") || ""
  );
  const navigate = useNavigate();
  const popupContext = React.useContext(PopupContext);

  return (
    <div>
      <nav>
        <h2 className="clickable" onClick={() => navigate("/")}>
          Mind Game
        </h2>
      </nav>
      <h1>Settings</h1>
      <div>
        <h2>Name:</h2>
        <input
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={"Random name"}
        />
      </div>
      <h2
        className="clickable underline"
        onClick={() => {
          window.localStorage.setItem("name", name);
          getToken(window.localStorage.getItem("token") || undefined);
          popupContext("Settings saved");
        }}
      >
        Save name
      </h2>
    </div>
  );
};

export default Settings;
