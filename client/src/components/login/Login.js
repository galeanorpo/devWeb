import { useState } from "react";
import "./login.css";
import App from "../../App";

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

function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loginSuccesFull, setLoginSuccesFull] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      userName: userName, // Asegúrate de que userName y password estén definidos antes de usarlos
      password: password,
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()) // La función json() es un método, por lo que debes invocarlo con paréntesis
      .then((res) => {
        if (res.token) {
          console.log(parseJwt(res.token));
          localStorage.setItem("token", res.token);
          setLoginSuccesFull(true);
        }
      })
      .catch((error) => {
        // La función catch debe tener un solo parámetro, que es el error
        console.log(error);
      });
  };

  return (
    <>
      {loginSuccesFull ? (
        <App></App>
      ) : (
        <div>
          <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              className="login-input"
              placeholder="Nombre de usuario"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="login-input"
              placeholder="Contraseña"
            />
            <button className="login-button" onClick={handleLogin}>
              Ingresar
            </button>
            <p className="forgot-password">¿Olvidaste tu contraseña?</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
