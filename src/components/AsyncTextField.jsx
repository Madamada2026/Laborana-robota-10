// src/components/AsyncTextField.jsx
import React from 'react';

const AsyncTextField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  isValidating, 
  type = "text", 
  placeholder = "+380..." 
}) => {
  return (
    <div style={{ marginBottom: '16px', width: '100%', boxSizing: 'border-box' }}>
      <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
        {label}
      </label>
      <div style={{ position: 'index', position: 'relative', width: '100%' }}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '10px 36px 10px 12px',
            borderRadius: '4px',
            border: `1px solid ${error ? '#d32f2f' : '#ccc'}`,
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        {/* Індикатор завантаження у вигляді емодзі ⏳ */}
        {isValidating && (
          <span 
            style={{ 
              position: 'absolute', 
              right: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '16px'
            }}
            title="Перевірка номера..."
          >
            ⏳
          </span>
        )}
      </div>
      {error && (
        <span style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px', display: 'block' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default AsyncTextField;
