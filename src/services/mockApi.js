// src/services/mockApi.js
export const mockRegisterUser = async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomChoice = Math.random();
      
      // 1. Успішна реєстрація (статус 200)
      if (randomChoice < 0.6) {
        resolve({
          status: 200,
          data: { message: 'Реєстрацію завершено успішно', user: userData }
        });
      } 
      // 2. Помилка валідації полів на стороні сервера (статус 400)
      else if (randomChoice < 0.85) {
        reject({
          status: 400,
          errors: {
            email: 'Цей email вже зайнятий в базі даних',
            username: "Ім'я занадто коротке або недопустиме"
          }
        });
      } 
      // 3. Загальна серверна помилка (статус 500)
      else {
        reject({
          status: 500,
          message: 'Виникла помилка сервера. Спробуйте пізніше'
        });
      }
    }, 800);
  });
};