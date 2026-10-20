import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: 'toast-success',
    error: 'toast-error',
    info: 'toast-info'
  };

  return (
    <div className={`toast ${typeStyles[type]}`} role="alert" aria-live="polite">
      <span>{message}</span>
      <button onClick={onClose} aria-label="Закрити повідомлення">
        ×
      </button>
    </div>
  );
};

export default Toast;
