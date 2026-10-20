// src/App.jsx
import React, { useState } from 'react';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import './App.css';

function App() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проста перевірка для демонстрації
    const newErrors = {};
    if (!values.email) newErrors.email = "Обов'язкове поле";
    if (!values.password) newErrors.password = "Обов'язкове поле";
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Форма успішно відправлена!');
      console.log('Дані форми:', values);
    }
  };

  return (
    <div className="App">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Тестування валідатора пароля</h2>

        {/* Поле Email */}
        <div className="form-field">
          <label>Електронна пошта</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Поле Пароля з індикатором */}
        <div className="form-field">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Введіть пароль"
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}

          {/* Індикатор надійності пароля */}
          <PasswordStrengthIndicator password={values.password} />
        </div>

        {/* Кнопка відправки */}
        <button type="submit" className="submit-button">
          Зареєструватися
        </button>
      </form>
    </div>
  );
}

export default App;
