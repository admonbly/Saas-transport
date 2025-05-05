import React, { useEffect } from 'react';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const typeStyles = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    warning: 'bg-warning text-black',
    info: 'bg-primary text-white',
  };

  return (
    <div className={`fixed top-5 right-5 z-50 px-6 py-3 rounded shadow-lg transition-all ${typeStyles[type] || typeStyles.info}`}>
      <span>{message}</span>
      <button className="ml-4 text-lg font-bold" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Notification;
