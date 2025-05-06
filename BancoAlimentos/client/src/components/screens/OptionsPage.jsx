import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/OptionsPage.css';
import { useAuth } from "../../contexts/AuthContext.js";


function OptionsPage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/"); // Redirigir al inicio después de cerrar sesión
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="options-container">
            <div className="options-content">
                <h1 className="options-title">¿Qué deseas hacer?</h1>
                <div className="options-grid">
                    <div 
                        className="option-card"
                        onClick={() => handleClick('/buscar-empleado')}
                    >
                        <div className="option-icon">🔍</div>
                        <h2>Buscar empleado</h2>
                        <p>Encuentra el talento perfecto para tu empresa</p>
                    </div>
                    
                    <div 
                        className="option-card"
                        onClick={() => handleClick('/hacer-perfil')}
                    >
                        <div className="option-icon">👤</div>
                        <h2>Hacer perfil</h2>
                        <p>Crea tu perfil y explora ofertas de trabajo</p>
                    </div>
                        <button className="logout-button" onClick={handleLogout}>
                Cerrar Sesión
            </button>
                </div>
            </div>
        </div>
    );
}

export default OptionsPage;