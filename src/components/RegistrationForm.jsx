// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import TextField from './TextField';
import AsyncTextField from './AsyncTextField';
import Toast from './Toast';
import { required, minLength, minAge, composeValidators } from '../utils/validators';
import { useAsyncValidation } from '../hooks/useAsyncValidation';
import { checkPhoneAvailability } from '../services/phoneService';

const RegistrationForm = () => {
  const [showToast, setShowToast] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Підключаємо хук асинхронної валідації телефону з дебаунсингом (500 мс)
  const { isValidating, asyncError, validate: validatePhoneAsync } = useAsyncValidation(
    checkPhoneAvailability, 
    500
  );

  const initialValues = {
    username: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
  };

  const validationRules = {
    username: composeValidators(required, minLength(2)),
    surname: composeValidators(required, minLength(2)),
    email: (value) => {
      if (!value) return "Це поле є обов'язковим";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(value).trim())) {
        return "Введіть коректну email-адресу";
      }
      return null;
    },
    password: composeValidators(required, minLength(8)),
    confirmPassword: (value) => {
      if (!value) return "Це поле є обов'язковим";
      return null;
    },
    birthDate: minAge(18)
  };

  // Обробник зміни телефону з викликом асинхронної перевірки
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhoneAsync(value, (errorMsg) => {
      setPhoneError(errorMsg);
    });
  };

  const handleSubmit = async (values) => {
    // Перевіряємо, чи немає помилки в телефоні або чи завершилась перевірка
    if (phoneError || isValidating) {
      alert('Будь ласка, дочекайтеся завершення перевірки або виправте номер телефону');
      return;
    }

    const fullFormData = { ...values, phone };
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Дані успішної реєстрації:', fullFormData);
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
      <form onSubmit={onSubmit} className="registration-form" noValidate>
        <h2>Реєстрація користувача</h2>
        
        <TextField
          label="Ім'я"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.username && errors.username}
        />

        <TextField
          label="Прізвище"
          name="surname"
          value={values.surname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.surname && errors.surname}
        />
        
        <TextField
          label="Електронна пошта"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />
        
        {/* Інтегроване асинхронне поле телефону з дебаунсингом та індикатором ⏳ */}
        <AsyncTextField
          label="Номер телефону"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          isValidating={isValidating}
          error={phoneError || asyncError}
          placeholder="+380501234567"
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

        <TextField
          label="Підтвердження паролю"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
        />

        <TextField
          label="Дата народження"
          name="birthDate"
          type="date"
          value={values.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.birthDate && errors.birthDate}
        />
        
        <button 
          type="submit" 
          disabled={isSubmitting || isValidating}
          className="submit-button"
        >
          {isSubmitting ? 'Реєстрація...' : 'Зареєструватися'}
        </button>
      </form>

      {showToast && (
        <Toast 
          message="Реєстрація успішна!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default RegistrationForm;
