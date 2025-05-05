import React from 'react';

const Button = ({ children, type = 'button', variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'button bg-gradient-to-r from-blue-500 to-blue-700',
    secondary: 'button bg-gradient-to-r from-orange-400 to-orange-600',
    accent: 'button bg-gradient-to-r from-green-400 to-green-600',
    danger: 'button bg-gradient-to-r from-red-500 to-red-700',
    outline: 'button border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
  };
  return (
    <button
      type={type}
      className={`${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
