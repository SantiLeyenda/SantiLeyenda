import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/ProfileOptionsPage.css';

function ProfileOptionsPage() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        console.log('Attempting to navigate to:', path);
        navigate(path);
    };

    const options = [
        {
            title: 'Hacer/Editar Perfil',
            description: 'Personaliza tu perfil y mantén tu información actualizada',
            path: '/make-edit-profile'
        },
        {
            title: 'Ver ofertas',
            description: 'Explora las ofertas disponibles para ti',
            path: '/look-at-offers'
        }
    ];

    return (
        <div className="profile-options-container">
            <div className="profile-content">
                <button 
                    className="back-button"
                    onClick={() => {
                        console.log('Navigating back to root options');
                        navigate('/options');  // Changed this to navigate to root
                    }}
                >
                    Atrás
                </button>
                <h2 className="profile-title">Opciones</h2>
                <div className="options-grid">
                    {options.map((option) => (
                        <div 
                            key={option.path}
                            className="option-card"
                            onClick={() => handleNavigation(option.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3 className="option-title">{option.title}</h3>
                            <p className="option-description">{option.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfileOptionsPage;