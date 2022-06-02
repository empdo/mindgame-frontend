import { GameEvent } from "./interfaces";

export const getToken = (token?: string) => {
  const name = window.localStorage.getItem("name") || "";
  fetch("https://mind.essung.dev/api/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      bodyToken: token,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getWs = (
  url: string,
  handleGameReducer: React.Dispatch<GameEvent>,
  token?: string
) => {
  const ws = new WebSocket(url + "?token=" + token);

  ws.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
    handleGameReducer(data);
  });

  ws.onclose = () => {
    console.log("closed");
    setTimeout(() => {
      getWs(url, handleGameReducer, token);
    }, 1000);
  };

  return ws;
};
