import React, { createContext, useContext, useState, useEffect } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth();

	async function signup(email, password) {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			return userCredential.user;
		} catch (error) {
			throw new Error(getErrorMessage(error.code));
		}
	}

	async function login(email, password) {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			return userCredential.user;
		} catch (error) {
			throw new Error(getErrorMessage(error.code));
		}
	}

	function logout() {
		return signOut(auth);
	}

	// Función helper para traducir códigos de error de Firebase
	function getErrorMessage(errorCode) {
		switch (errorCode) {
			case "auth/email-already-in-use":
				return "Este correo electrónico ya está registrado";
			case "auth/invalid-email":
				return "Correo electrónico inválido";
			case "auth/operation-not-allowed":
				return "Operación no permitida";
			case "auth/weak-password":
				return "La contraseña es demasiado débil";
			default:
				return "Ocurrió un error durante la autenticación";
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, [auth]);

	const value = {
		currentUser,
		signup,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
