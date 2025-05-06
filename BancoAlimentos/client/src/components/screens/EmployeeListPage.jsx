import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../UI/FilterModal.jsx";
import "./css/EmployeeListPage.css";

// Sample employee data
const employees = [
	{
		id: 1,
		name: "Juan Cortez",
		location: "Guadalajara",
		ability: 4.5,
		skills: ["JavaScript", "React", "Node.js"],
		image: "https://via.placeholder.com/50",
	},
	{
		id: 2,
		name: "Maria Sanchez",
		location: "Mexico City",
		ability: 4.8,
		skills: ["Python", "Django", "SQL"],
		image: "https://via.placeholder.com/50",
	},
	{
		id: 3,
		name: "Carlos Ramirez",
		location: "Monterrey",
		ability: 4.2,
		skills: ["Java", "Spring", "Docker"],
		image: "https://via.placeholder.com/50",
	},
];

function EmployeeListPage() {
	const navigate = useNavigate();
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState({
		location: "All",
		minRating: 0,
		selectedSkills: [],
	});

	const filteredEmployees = employees.filter((employee) => {
		const matchesLocation =
			filters.location === "All" || employee.location === filters.location;
		const matchesRating = employee.ability >= filters.minRating;
		const matchesSkills =
			filters.selectedSkills.length === 0 ||
			filters.selectedSkills.some((skill) => employee.skills.includes(skill));

		return matchesLocation && matchesRating && matchesSkills;
	});

	return (
		<div className="employee-list-container">
			<button className="back-button" onClick={() => navigate("/options")}>
				Atrás
			</button>
			<div style={{ width: "90%", maxWidth: "500px", marginBottom: "1rem" }}>
				<button className="filter-button" onClick={() => setShowFilters(true)}>
					🔍 Filtros
				</button>
			</div>

			{filteredEmployees.map((employee) => (
				<div key={employee.id} className="employee-card">
					<img
						src={employee.image}
						alt={`${employee.name}`}
						className="employee-image"
					/>
					<div className="employee-info">
						<h3>{employee.name}</h3>
						<p>
							<span role="img" aria-label="location-pin">
								📍
							</span>
							{employee.location}
						</p>
						<div className="employee-rating">
							<span role="img" aria-label="star">
								⭐
							</span>
							{employee.ability}
						</div>
						<div className="skills-container">
							{/* Only map over the employee's skills array */}
							{employee.skills.map((skill) => (
								<span key={skill} className="skill-tag">
									{skill}
								</span>
							))}
						</div>
						<button className="contact-button">Contactar</button>
					</div>
				</div>
			))}

			{showFilters && (
				<FilterModal
					filters={filters}
					setFilters={setFilters}
					onClose={() => setShowFilters(false)}
				/>
			)}
		</div>
	);
}

export default EmployeeListPage;
