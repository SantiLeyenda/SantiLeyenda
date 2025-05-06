import React from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";

function Home() {
	return (
		<div className="home-container">
			<h1 className="home-title">Buscador de Empleos</h1>
			<nav className="home-nav">
				<Link to="/login" className="home-button">
					Ingresar
				</Link>
				<Link to="/signup" className="home-button">
					Crear Cuenta
				</Link>
			</nav>
		</div>
	);
}

export default Home;
