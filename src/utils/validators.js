export const required = (value) => {
  return value && value.trim() !== "" ? null : "Це поле є обов'язковим";
};

export const minLength = (min) => (value) => {
  return value && value.length < min 
    ? `Мінімальна довжина ${min} символів` 
    : null;
};

export const maxLength = (max) => (value) => {
  return value && value.length > max 
    ? `Максимальна довжина ${max} символів` 
    : null;
};

export const email = (value) => {
  // Більш гнучкий регулярний вираз для email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return value && !emailRegex.test(value) 
    ? "Введіть коректну email-адресу" 
    : null;
};

export const composeValidators = (...validators) => (value) => {
  return validators.reduce((error, validator) => {
    return error || validator(value);
  }, null);
};
