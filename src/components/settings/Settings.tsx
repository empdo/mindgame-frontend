import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  let [name, setName] = React.useState(
    window.localStorage.getItem("name") || ""
  );
  const navigate = useNavigate();

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <h2
        className="clickable underline"
        onClick={() => window.localStorage.setItem("name", name)}
      >
        {name ? "Save name" : "Save name (empty)"}
      </h2>
    </div>
  );
};

export default Settings;
