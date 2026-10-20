// src/utils/validators.js

export const required = (value) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return "Обов'язкове поле";
  }
  return null;
};

export const email = (value) => {
  if (!value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Невірний формат електронної пошти";
  }
  return null;
};

// Функція для Individual Task 1: Аналіз надійності пароля
export const passwordStrength = (password = '') => {
  let score = 0;
  const recommendations = [];

  const hasLower = /[a-zа-яіїєґ]/.test(password);
  const hasUpper = /[A-ZА-ЯІЇЄҐ]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-zА-Яа-яІЇЄҐіїєґ0-9]/.test(password);
  const isLongEnough = password.length > 12;

  if (hasLower) score++;
  else recommendations.push("Додайте малі літери");

  if (hasUpper) score++;
  else recommendations.push("Додайте великі літери");

  if (hasNumber) score++;
  else recommendations.push("Додайте цифри");

  if (hasSpecial) score++;
  else recommendations.push("Додайте спеціальні символи");

  if (isLongEnough) score++;
  else recommendations.push("Збільште довжину до 12+ символів");

  return { score, recommendations };
};
