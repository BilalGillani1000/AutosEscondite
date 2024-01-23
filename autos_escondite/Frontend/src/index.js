import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import Signin from './pages/signin';
import SignUp from './pages/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Using Concurrent Mode with createRoot
root.render(
  <React.StrictMode>
    {/* <Home /> */}
    <Signin />
    {/* <SignUp /> */}
  </React.StrictMode>,
);
