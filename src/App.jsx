// src/App.jsx
import React from 'react';
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="App" style={{ padding: '20px', background: '#f5f5f5', minHeight: '100vh' }}>
      <RegistrationForm />
    </div>
  );
}

export default App;