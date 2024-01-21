import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Using Concurrent Mode with createRoot
root.render(
  <React.StrictMode>
    <h1>Welcome to Autos Escondite!</h1>
  </React.StrictMode>,
);
