import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { auth } from "../../firebase.js";
import Alert  from "../UI/Alert.js";
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await signInWithEmailAndPassword(auth, formData.email, formData.password);
			navigate("/options");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			navigate("/options");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="login-container">
			<button className="back-button" onClick={() => navigate("/")}>
				Atrás
			</button>

			<div className="login-content">
				<h2>Iniciar Sesión</h2>

				{error && <Alert type="error" children={error} />}

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Correo electrónico"
							required
						/>
					</div>

					<div className="form-group">
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Contraseña"
							required
						/>
					</div>

					<button type="submit" className="login-button" disabled={loading}>
						{loading ? "Iniciando sesión..." : "Iniciar Sesión"}
					</button>

					<button
						type="button"
						className="google-button"
						onClick={handleGoogleSignIn}
					>
						Iniciar sesión con Google
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
