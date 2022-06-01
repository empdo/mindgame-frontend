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
    })
    .catch((err) => {
      console.log(err);
    });
};
