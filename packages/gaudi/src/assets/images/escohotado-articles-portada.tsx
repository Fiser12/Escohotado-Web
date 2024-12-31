import React from 'react';
import smokeEscohotado from "./escohotado-articles-portada.png";

export const EscohotadoArticlesPortada: React.FC = () => {
    return (
        <div>
            <img 
                src={smokeEscohotado.src} 
                alt="Escohotado image" 
                className="order-2 md:order-none" 
            />
        </div>
    );
};
