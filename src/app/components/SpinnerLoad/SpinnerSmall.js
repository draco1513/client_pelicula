import React from 'react';
import './spinnerSmall.scss'

const SpinnerSmall = ({ open }) => {
    return (
        <span
            className="loader-small"
            style={{
                visibility: (open === true ? '' : 'hidden'),
                transition: 'visibility 0.3s ease-in-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Agrega la transición CSS
                transform: (open === true ? 'scale(1)' : 'scale(0.5)') // Agrega el efecto de rebote
              }}
        ></span>
    );
};

export default SpinnerSmall;