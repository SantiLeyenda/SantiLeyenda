// SkillSelector.js
import React from "react";
import SkillButton from "./SkillButton.js";

// Predefined list of available skills
export const AVAILABLE_SKILLS = [
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

const SkillSelector = ({ selectedSkills, onSkillToggle, mode = "select" }) => {
	return (
		<div className="flex flex-wrap gap-1">
			{AVAILABLE_SKILLS.map((skill) => (
				<SkillButton
					key={skill}
					skill={skill}
					isSelected={selectedSkills.includes(skill)}
					onClick={() => onSkillToggle(skill)}
					mode={mode}
				/>
			))}
		</div>
	);
};

export default SkillSelector;
