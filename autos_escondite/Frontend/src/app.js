import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AdminPage from "./pages/admin";
import AdminSignIn from "./pages/adminSignin";
import AdminSignUp from "./pages/adminSignup";
import UploadCar from "./components/uploadCar";
import UploadEvent from "./components/uploadEvent";
import ShowCar from "./pages/showCar";
import Test from "./pages/test";
import ImageUpload from "./pages/uploadImage";

const App=()=>{
    return(
        <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/uploadcar" element={<UploadCar />} />
          <Route path="/admin/uploadevent" element={<UploadEvent />} />
          <Route path="/cars/:carId" element={<ShowCar />} />
          <Route path="/test" element={<Test />} />
          <Route exact path="/admin/imageUpload" element={<ImageUpload />} />
      </Routes>
    </BrowserRouter>
    );
}
export default App;