// src/components/MultiEmailForm.jsx
import React, { useState } from 'react';
import TextField from './TextField';
import Toast from './Toast';
import { email as validateEmail, required } from '../utils/validators';

const MultiEmailForm = () => {
  // Начальное состояние: одно пустое поле email с уникальным id
  const [emails, setEmails] = useState([
    { id: Date.now(), value: '', error: null }
  ]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Обработчик изменения значения в конкретном поле
  const handleChange = (id, value) => {
    setEmails(prev =>
      prev.map(item =>
        item.id === id ? { ...item, value, error: null } : item
      )
    );
  };

  // Добавление нового поля email с проверкой на дубликаты
  const handleAddEmail = () => {
    // Проверка: есть ли уже пустые поля
    const hasEmpty = emails.some(item => !item.value.trim());
    if (hasEmpty) {
      setToastMessage('Заполните существующие поля перед добавлением нового');
      setShowToast(true);
      return;
    }

    // Проверка уникальности (дубликатов) через метод find
    const valuesArray = emails.map(item => item.value.trim().toLowerCase());
    const hasDuplicates = valuesArray.some(
      (val, index) => valuesArray.indexOf(val) !== index
    );

    if (hasDuplicates) {
      setToastMessage('Такая адреса вже додана');
      setShowToast(true);
      return;
    }

    // Добавляем новое пустое поле
    setEmails(prev => [
      ...prev,
      { id: Date.now() + Math.random(), value: '', error: null }
    ]);
  };

  // Удаление поля по его id
  const handleRemoveEmail = (id) => {
    if (emails.length > 1) {
      setEmails(prev => prev.filter(item => item.id !== id));
    }
  };

  // Отправка формы с валидацией всех полей одновременно
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    // Валидируем каждое поле
    const validatedEmails = emails.map(item => {
      const trimmedValue = item.value.trim();
      let error = required(trimmedValue) || validateEmail(trimmedValue);

      if (error) {
        hasErrors = true;
      }

      return { ...item, error };
    });

    // Дополнительная проверка уникальности перед отправкой
    const valuesArray = validatedEmails.map(item => item.value.trim().toLowerCase());
    const seen = new Set();
    const finalEmails = validatedEmails.map(item => {
      const val = item.value.trim().toLowerCase();
      if (val && seen.has(val)) {
        hasErrors = true;
        return { ...item, error: 'Дубликат email-адреса' };
      }
      if (val) seen.add(val);
      return item;
    });

    setEmails(finalEmails);

    if (!hasErrors) {
      console.log('Список email-адресов:', finalEmails.map(i => i.value));
      setIsSuccess(true);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '20px auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2>Форма с динамическим списком Email</h2>
      <form onSubmit={handleSubmit} noValidate>
        {emails.map((item, index) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <TextField
                label={`Email #${index + 1}`}
                name={`email_${item.id}`}
                type="email"
                value={item.value}
                onChange={(e) => handleChange(item.id, e.target.value)}
                error={item.error}
                placeholder="example@mail.com"
              />
            </div>
            {/* Кнопка удаления отображается только если полей больше одного */}
            {emails.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveEmail(item.id)}
                className="remove-button"
                style={{
                  marginTop: '28px',
                  padding: '10px 14px',
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Удалить
              </button>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleAddEmail}
            className="add-button"
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Додати email
          </button>
          
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Отправить
          </button>
        </div>
      </form>

      {showToast && (
        <Toast
          message={toastMessage}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}

      {isSuccess && (
        <Toast
          message="Форма успешно отправлена!"
          type="success"
          onClose={() => setIsSuccess(false)}
        />
      )}
    </div>
  );
};

export default MultiEmailForm;