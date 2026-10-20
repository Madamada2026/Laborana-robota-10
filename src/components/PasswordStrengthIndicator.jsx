// src/components/PasswordStrengthIndicator.jsx
import React from 'react';
import { passwordStrength } from '../utils/validators';

const PasswordStrengthIndicator = ({ password }) => {
  // Згідно з вимогами, індикатор не відображається, коли поле пароля порожнє
  if (!password) return null;

  const { score, recommendations } = passwordStrength(password);

  // Визначаємо CSS-класи та кольори відповідно до кількості балів
  let strengthClass = 'strength-weak';
  let barColor = '#ff4d4d'; // червоний для 1-2 балів

  if (score === 3) {
    strengthClass = 'strength-medium';
    barColor = '#ffa500'; // помаранчевий для 3 балів
  } else if (score === 4) {
    strengthClass = 'strength-good';
    barColor = '#ffcc00'; // жовтий для 4 балів
  } else if (score === 5) {
    strengthClass = 'strength-strong';
    barColor = '#4caf50'; // зелений для 5 балів
  }

  return (
    <div className={`password-strength-container ${strengthClass}`} style={{ marginTop: '6px', marginBottom: '10px' }}>
      {/* Прогрес-бар */}
      <div 
        className="strength-bar" 
        style={{ 
          height: '6px', 
          width: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '6px'
        }}
      >
        <div 
          style={{ 
            height: '100%', 
            width: `${(score / 5) * 100}%`, 
            backgroundColor: barColor,
            transition: 'width 0.3s ease, background-color 0.3s ease' 
          }}
        />
      </div>

      {/* Текстові рекомендації або повідомлення про успіх */}
      {score === 5 ? (
        <p style={{ color: '#4caf50', fontSize: '12px', fontWeight: 'bold', margin: 0 }}>
          Надійний пароль
        </p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#666' }}>
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;