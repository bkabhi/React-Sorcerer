// Button.js
import React from 'react';

const Button = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>{label}</button>
    );
}

export default Button;
