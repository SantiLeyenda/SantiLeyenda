import React from 'react';

import { useNavigate } from 'react-router-dom';
import './css/JobOffersPage.css';

function JobOffersPage() {
    const navigate = useNavigate();

    // Sample job offers data
    const jobOffers = [
        {
            id: 1,
            title: 'Desarrollador Web Frontend',
            description: 'Buscamos un desarrollador web frontend con experiencia en React y conocimientos de UI/UX. El candidato ideal debe tener capacidad para trabajar en equipo y pasión por crear interfaces de usuario excepcionales.',
            location: 'Madrid, España (Híbrido)',
            hours: '40 horas semanales, Lunes a Viernes',
            phone: '+34 123 456 789',
            email: 'rrhh@empresa1.es'
        },
        {
            id: 2,
            title: 'Diseñador UX/UI Senior',
            description: 'Empresa líder en tecnología busca diseñador UX/UI senior para liderar proyectos de diseño de productos digitales. Se requiere experiencia en Figma y capacidad para mentorizar a diseñadores junior.',
            location: 'Barcelona, España (Remoto)',
            hours: '35 horas semanales, Horario flexible',
            phone: '+34 987 654 321',
            email: 'careers@empresa2.com'
        },
        {
            id: 3,
            title: 'Desarrollador Backend Java',
            description: 'Se busca desarrollador backend con experiencia en Java y Spring Boot. Importante conocimiento en bases de datos SQL y NoSQL. Valorable experiencia en arquitecturas microservicios.',
            location: 'Valencia, España (Presencial)',
            hours: '40 horas semanales, 9:00-18:00',
            phone: '+34 555 123 456',
            email: 'jobs@empresa3.es'
        }
    ];

    return (
        <div className="offers-container">
            <div className="offers-content">
                <button 
                    className="back-button"
                    onClick={() => navigate('/hacer-perfil')}
                >
                    Atrás
                </button>
                <h2 className="offers-title">Ofertas de Trabajo</h2>
                
                {jobOffers.map((job) => (
                    <div key={job.id} className="job-card">
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-info">
                            <strong>Ubicación:</strong> {job.location}
                        </p>
                        <p className="job-info">
                            <strong>Horario:</strong> {job.hours}
                        </p>
                        <p className="job-description">{job.description}</p>
                        <div className="contact-info">
                            <div className="contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                {job.phone}
                            </div>
                            <div className="contact-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                {job.email}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobOffersPage;