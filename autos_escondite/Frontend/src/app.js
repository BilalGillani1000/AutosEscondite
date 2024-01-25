import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import UploadCar from "./pages/uploadCar";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import AdminSignIn from "./pages/adminSignin";
import AdminSignUp from "./pages/adminSignup";
import Test from "./pages/test";
import ImageUpload from "./pages/uploadImage";

const App=()=>{
    return(
        <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/uploadcar" element={<UploadCar />} />
          <Route path="/test" element={<Test />} />
          <Route exact path="/admin/imageUpload" element={<ImageUpload />} />
      </Routes>
    </BrowserRouter>
    );
}
export default App;