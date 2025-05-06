import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillSelector from "../UI/SkillSelector.js";
import "./css/EditProfilePage.css";

function EditProfilePage() {
	const navigate = useNavigate();
	const [isEmployer, setIsEmployer] = useState(false);
	const [profile, setProfile] = useState({
		name: "",
		lastName: "",
		companyName: "",
		image: null,
		location: "",
		skills: [],
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfile({
			...profile,
			[name]: value,
		});
	};

	const handleSkillToggle = (skill) => {
		setProfile((prev) => ({
			...prev,
			skills: prev.skills.includes(skill)
				? prev.skills.filter((s) => s !== skill)
				: [...prev.skills, skill],
		}));
	};

	const handleImageUpload = (e) => {
		setProfile({
			...profile,
			image: e.target.files[0],
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ isEmployer, profile });
	};

	const toggleProfileType = () => {
		setIsEmployer(!isEmployer);
		setProfile({
			name: "",
			lastName: "",
			companyName: "",
			image: null,
			location: "",
			skills: [],
		});
	};

	return (
		<div className="edit-profile-container">
			<button className="back-button" onClick={() => navigate("/hacer-perfil")}>
				Atrás
			</button>
			<h2>Editar perfil</h2>
			<div className="profile-type-toggle">
				<button
					type="button"
					className={`toggle-button ${!isEmployer ? "active" : ""}`}
					onClick={toggleProfileType}
				>
					Buscador de empleo
				</button>
				<button
					type="button"
					className={`toggle-button ${isEmployer ? "active" : ""}`}
					onClick={toggleProfileType}
				>
					Empleador
				</button>
			</div>
			<form className="edit-profile-form" onSubmit={handleSubmit}>
				<label>
					Nombre:
					<input
						type="text"
						name="name"
						value={profile.name}
						onChange={handleInputChange}
					/>
				</label>
				{!isEmployer && (
					<label>
						Apellido:
						<input
							type="text"
							name="lastName"
							value={profile.lastName}
							onChange={handleInputChange}
						/>
					</label>
				)}
				{isEmployer && (
					<label>
						Nombre de la empresa:
						<input
							type="text"
							name="companyName"
							value={profile.companyName}
							onChange={handleInputChange}
						/>
					</label>
				)}
				<label>
					Subir Imagen:
					<input type="file" accept="image/*" onChange={handleImageUpload} />
				</label>
				<label>
					Locación:
					<input
						type="text"
						name="location"
						value={profile.location}
						onChange={handleInputChange}
					/>
				</label>
				{!isEmployer && (
					<label>
						Habilidades:
						<div className="skills-container">
							<SkillSelector
								selectedSkills={profile.skills}
								onSkillToggle={handleSkillToggle}
							/>
						</div>
					</label>
				)}
				<button type="submit">Guardar perfil</button>
			</form>
		</div>
	);
}

export default EditProfilePage;
