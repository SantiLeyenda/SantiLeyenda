import React from 'react';

function SkillButton({ skill, isSelected, onClick, mode = 'select' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`skill-button ${isSelected ? 'selected' : ''} ${mode}`}
        >
            {skill}
        </button>
    );
}

export default SkillButton;