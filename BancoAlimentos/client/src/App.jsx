import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.js";
import PrivateRoute from "./components/PrivateRoute.js";
import Home from "./components/screens/Home.jsx";
import Login from "./components/screens/Login.jsx";
import Signup from "./components/screens/Signup.jsx";
import OptionsPage from "./components/screens/OptionsPage.jsx";
import ProfileOptionsPage from "./components/screens/ProfileOptionsPage.jsx";
import EditProfilePage from "./components/screens/EditProfilePage.jsx";
import EmployeeListPage from "./components/screens/EmployeeListPage.jsx";
import JobOffersPage from "./components/screens/JobOffersPage.jsx";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/options"
						element={
							<PrivateRoute>
								<OptionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/hacer-perfil"
						element={
							<PrivateRoute>
								<ProfileOptionsPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/make-edit-profile"
						element={
							<PrivateRoute>
								<EditProfilePage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/buscar-empleado"
						element={
							<PrivateRoute>
								<EmployeeListPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/look-at-offers"
						element={
							<PrivateRoute>
								<JobOffersPage />
							</PrivateRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
