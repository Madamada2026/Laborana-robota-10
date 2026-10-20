// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import Toast from './Toast';
import { mockRegisterUser } from '../services/mockApi';

const RegistrationForm = () => {
  const [values, setValues] = useState({
    username: 'Ruslan',
    surname: 'Semeniakhin',
    email: 'test@gmail.com',
    password: 'password123',
    confirmPassword: 'password123',
    birthDate: '1998-06-24'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await mockRegisterUser(values);
      if (response.status === 200) {
        setToast({
          show: true,
          message: 'Реєстрацію завершено успішно',
          type: 'success'
        });
        setValues({
          username: '',
          surname: '',
          email: '',
          password: '',
          confirmPassword: '',
          birthDate: ''
        });
      }
    } catch (error) {
      if (error.status === 400 && error.errors) {
        setErrors(error.errors);
      } else {
        setToast({
          show: true,
          message: error.message || 'Виникла помилка сервера. Спробуйте пізніше',
          type: 'error'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'relative' }}>
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <h2>Реєстрація користувача</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ім'я</label>
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.username && <span style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Прізвище</label>
          <input
            type="text"
            name="surname"
            value={values.surname}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Електронна пошта</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Пароль</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Підтвердження паролю</label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Дата народження</label>
          <input
            type="date"
            name="birthDate"
            value={values.birthDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isSubmitting ? '#90caf9' : '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
      </form>

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, show: false })} 
        />
      )}
    </div>
  );
};

export default RegistrationForm;
