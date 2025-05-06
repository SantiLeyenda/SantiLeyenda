import React, { useState } from "react";
import "../screens/css/FilterModal.css";

const locations = ["All", "Guadalajara", "Mexico City", "Monterrey"];

// Predefined list of available skills
const AVAILABLE_SKILLS = [
	"JavaScript",
	"Python",
	"Java",
	"React",
	"Angular",
	"Vue.js",
	"Node.js",
	"Express",
	"Django",
	"Spring",
	"SQL",
	"MongoDB",
	"AWS",
	"Docker",
	"Kubernetes",
	"Git",
	"HTML/CSS",
	"TypeScript",
];

function FilterModal({ filters, setFilters, onClose }) {
	const [tempFilters, setTempFilters] = useState({
		location: filters.location || "All",
		minRating: filters.minRating || 0,
		selectedSkills: filters.selectedSkills || [],
	});

	const handleSkillToggle = (skill) => {
		setTempFilters((prev) => ({
			...prev,
			selectedSkills: prev.selectedSkills.includes(skill)
				? prev.selectedSkills.filter((s) => s !== skill)
				: [...prev.selectedSkills, skill],
		}));
	};

	const handleApply = () => {
		setFilters(tempFilters);
		onClose();
	};

	return (
		<div className="filter-overlay">
			<div className="filter-modal">
				<div className="filter-header">
					<h2>Filtros</h2>
					<button className="close-button" onClick={onClose}>
						×
					</button>
				</div>

				<div className="filter-form">
					<div className="filter-group">
						<label>Ubicación</label>
						<select
							className="filter-select"
							value={tempFilters.location}
							onChange={(e) =>
								setTempFilters({
									...tempFilters,
									location: e.target.value,
								})
							}
						>
							{locations.map((location) => (
								<option key={location} value={location}>
									{location}
								</option>
							))}
						</select>
					</div>

					<div className="filter-group">
						<label>Calificación mínima</label>
						<input
							type="range"
							min="0"
							max="5"
							step="0.1"
							value={tempFilters.minRating}
							onChange={(e) =>
								setTempFilters({
									...tempFilters,
									minRating: parseFloat(e.target.value),
								})
							}
							className="filter-input"
						/>
						<span>{tempFilters.minRating.toFixed(1)} ⭐</span>
					</div>

					<div className="filter-group">
						<label>Habilidades</label>
						<div className="skills-filter-container">
							{AVAILABLE_SKILLS.map((skill) => (
								<button
									key={skill}
									onClick={() => handleSkillToggle(skill)}
									className={`skill-filter-button ${
										tempFilters.selectedSkills.includes(skill) ? "selected" : ""
									}`}
									type="button"
								>
									{skill}
								</button>
							))}
						</div>
					</div>

					<div className="filter-actions">
						<button className="filter-cancel" onClick={onClose}>
							Cancelar
						</button>
						<button className="filter-apply" onClick={handleApply}>
							Aplicar Filtros
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FilterModal;
