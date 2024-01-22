import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import ComboBox from "../components/idealCar";

const Home=()=>{
    return(
        <div>
            <Navbar />
            <HeroSection />
            <ComboBox holder={"make"}/>
            <ComboBox holder={"model"}/>
            <ComboBox holder={"year"}/>
        </div>
    );
}

export default Home;