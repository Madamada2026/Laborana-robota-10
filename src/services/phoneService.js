// src/services/phoneService.js

// Масив тестових зайнятих номерів
const BUSY_PHONES = [
  '+380501234567',
  '+380671234567',
  '+380931234567'
];

/**
 * Імітує асинхронну перевірку доступності номера телефону через API
 * Затримка 500 мс
 */
export const checkPhoneAvailability = async (phone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isBusy = BUSY_PHONES.includes(phone.trim());
      resolve({
        available: !isBusy,
        message: isBusy ? 'Цей номер вже зареєстрований' : null
      });
    }, 500);
  });
};
