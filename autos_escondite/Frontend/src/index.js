import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Using Concurrent Mode with createRoot
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
