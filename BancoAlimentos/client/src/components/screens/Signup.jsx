import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import Alert from "../UI/Alert.js";
import "./css/Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      
      // Validaciones básicas
      if (!username || !password) {
        throw new Error("Por favor complete todos los campos");
      }
      
      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      // Crear cuenta usando el contexto de autenticación
      await signup(username, password);
      
      // Si el registro es exitoso, redirigir a opciones
      navigate("/options");
    } catch (error) {
      setError(
        error.message || "Ocurrió un error al crear la cuenta"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <button 
        className="back-button" 
        onClick={() => navigate("/")}
        disabled={loading}
      >
        Atrás
      </button>
      
      <h2>Registro</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        
        <button 
          type="submit"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}

export default Signup;