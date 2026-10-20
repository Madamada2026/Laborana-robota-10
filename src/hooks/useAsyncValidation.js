// src/hooks/useAsyncValidation.js
import { useState, useRef, useCallback } from 'react';

export const useAsyncValidation = (asyncValidatorFunction, delay = 500) => {
  const [isValidating, setIsValidating] = useState(false);
  const [asyncError, setAsyncError] = useState(null);
  
  // Використовуємо useRef для збереження ідентифікатора таймера між ререндерами
  const timerRef = useRef(null);

  const validate = useCallback((value, callback) => {
    // Очищаємо попередній таймер (скасовуємо попередню валідацію при швидкому вводі)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (!value || value.trim() === '') {
      setIsValidating(false);
      setAsyncError(null);
      if (callback) callback(null);
      return;
    }

    // Вмикаємо індикатор завантаження
    setIsValidating(true);
    setAsyncError(null);

    // Встановлюємо новий таймер на затримку (дебаунсинг)
    timerRef.current = setTimeout(async () => {
      try {
        const result = await asyncValidatorFunction(value);
        setAsyncError(result.message);
        if (callback) callback(result.message);
      } catch (error) {
        console.error('Помилка асинхронної валідації:', error);
      } finally {
        // Вимикаємо індикатор завантаження після завершення перевірки
        setIsValidating(false);
      }
    }, delay);
  }, [asyncValidatorFunction, delay]);

  return {
    isValidating,
    asyncError,
    validate
  };
};
