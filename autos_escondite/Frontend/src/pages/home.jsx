import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import ComboBox from "../components/idealCar";
import FeaturedCars from "../components/featuredCars";
import Event from "../components/events";
import Footer from "../components/footer";

const Home=()=>{
    return(
        <div>
            <Navbar />
            <HeroSection />
            <div>
                <ComboBox holder={"make"}/>
                <ComboBox holder={"model"}/>
                <ComboBox holder={"year"}/>
            </div>
            <FeaturedCars />
            <FeaturedCars />
            <FeaturedCars />
            <Event />
            <Event />
            <Event />
            <Footer />
        </div>
    );
}

export default Home;