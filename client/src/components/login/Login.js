import { useState } from "react";
import "./login.css";

function Login() {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

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
        console.log(res);
      })
      .catch((error) => {
        // La función catch debe tener un solo parámetro, que es el error
        console.log(error);
      });
  };

  return (
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
  );
}

export default Login;
