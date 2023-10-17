import Login from "../Login";
import App from "./App";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

let tokenExisteAndValido =
  parseJwt(localStorage.getItem("token")).exp * 1000 > Date.now();

const Main = () => {
  return <>{tokenExisteAndValido ? <App></App> : <Login></Login>}</>;
};

export default Main;
