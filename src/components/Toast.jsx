import { useEffect } from 'react';
import '../styles/main.css';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-overlay">
      <div className="toast-box">
        <div className="toast-icon">
          {/* Simple checkmark SVG icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div className="toast-content">
          <h4>Success</h4>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;