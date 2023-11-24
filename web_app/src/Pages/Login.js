import React, { useState } from "react";
import "./Login.css";
import axios from "../api/axios"; // Importa tu instancia de axios
import { useNavigate } from "react-router-dom";
function Login() {
  const [cfn, setCfn] = useState("");
  const [ecn, setEcn] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ajustar encabezados para la solicitud
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = { cfn, ecn };

      // Realiza la solicitud POST con los datos y los encabezados
      const response = await axios.post("/dwellings/login", data, config);
      if (response.status === 200) {
        window.alert("Login successful");

        const { accessToken, refreshToken } = response.data;

        // Almacenar los tokens y redirigir
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/dashboard");
      }

      // Redirige al usuario o actualiza el estado aquí
    } catch (error) {
      window.alert("CFN or ECN is incorrect");

      console.error("Error en el inicio de sesión:", error);
      // Manejar el error aquí
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cfn">CFN</label>
            <input
              type="text"
              id="cfn"
              value={cfn}
              onChange={(e) => setCfn(e.target.value)}
              required
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="ecn">ECN</label>
            <input
              type="text"
              id="ecn"
              value={ecn}
              onChange={(e) => setEcn(e.target.value)}
              required
              style={{ borderRadius: "15px" }}
            />
          </div>
          <button className="round-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
