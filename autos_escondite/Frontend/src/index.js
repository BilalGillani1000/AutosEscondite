import React from 'react';
import ReactDOM from 'react-dom/client';
// import Home from './pages/home';
// import Signin from './pages/signin';
// import SignUp from './pages/signup';
// import CarForm from './pages/uploadCar';
// import ImageUpload from './pages/uploadImage';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Using Concurrent Mode with createRoot
root.render(
  <React.StrictMode>
    {/* <Home /> */}
    {/* <Signin /> */}
    {/* <SignUp /> */}
    {/* <CarForm /> */}
    {/* <ImageUpload /> */}
    <App />
  </React.StrictMode>,
);
