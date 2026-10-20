import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import TextField from './TextField';
import Toast from './Toast';
import { required, email, minLength, composeValidators } from '../utils/validators';

const LoginForm = () => {
  const [showToast, setShowToast] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationRules = {
    email: composeValidators(required, email),
    password: composeValidators(required, minLength(8))
  };

  const handleSubmit = async (values) => {
    // Симуляція затримки мережевого запиту
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Дані успішного входу:', values);
    setShowToast(true);
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit: onSubmit
  } = useForm({ initialValues, validationRules, onSubmit: handleSubmit });

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={onSubmit} className="registration-form">
        <h2>Вхід до системи</h2>
        
        <TextField
          label="Електронна пошта"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />
        
        <TextField
          label="Пароль"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Вхід...' : 'Увійти'}
        </button>
      </form>

      {showToast && (
        <Toast 
          message="Вхід успішний!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default LoginForm;
