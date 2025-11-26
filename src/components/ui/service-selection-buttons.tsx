import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceSelectionButtonsProps {
  services: { path: string; label: string }[];
  currentPath: string;
}

export const ServiceSelectionButtons: React.FC<ServiceSelectionButtonsProps> = ({ services, currentPath }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {services.map((service) => (
        <Link
          key={service.path}
          to={service.path}
          className={`
            py-3 px-6 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
            ${service.path === currentPath
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }
          `}
        >
          {service.label.replace('pet sitter', 'promeneur certifié')}
        </Link>
      ))}
    </div>
  );
};
