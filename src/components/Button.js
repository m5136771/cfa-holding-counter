import React from 'react';

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out"
    >
      {label}
    </button>
  );
};

export default Button;