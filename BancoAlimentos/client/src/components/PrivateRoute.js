import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";

function PrivateRoute({ children }) {
	const { currentUser, loading } = useAuth();

	if (loading) {
		return <div>Cargando...</div>;
	}

	return currentUser ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
