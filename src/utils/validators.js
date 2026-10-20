export const required = (value) => { 
  if (value === 0 || value === false) return null;
  return value && String(value).trim() !== "" ? null : "Це поле є обов'язковим"; 
}; 

export const minLength = (min) => (value) => { 
  return value && value.length < min ? `Мінімальна довжина ${min} символів` : null; 
}; 

export const maxLength = (max) => (value) => { 
  return value && value.length > max ? `Максимальна довжина ${max} символів` : null; 
}; 

export const email = (value) => { 
  if (!value) return null;
  const stringValue = String(value).trim();
  // Перевірка на базову структуру email (наявність хоча б одного символу до @, після @ і крапки в домені)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/; 
  return !emailRegex.test(stringValue) ? "Введіть коректну email-адресу" : null; 
}; 

export const composeValidators = (...validators) => (value) => { 
  return validators.reduce((error, validator) => { 
    return error || validator(value); 
  }, null); 
}; 

export const minAge = (years) => (value) => { 
  if (!value) return null; 
  
  const birthDate = new Date(value); 
  if (isNaN(birthDate.getTime())) return "Некоректний формат дати";

  const today = new Date(); 
  let age = today.getFullYear() - birthDate.getFullYear(); 
  const monthDifference = today.getMonth() - birthDate.getMonth(); 
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) { 
    age--; 
  } 
  
  return age < years ? `Вам має бути щонайменше ${years} років` : null; 
};
