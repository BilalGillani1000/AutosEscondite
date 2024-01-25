import React from "react";
import video from "../content/videos/mainVideo.mp4";
import "../styles/styles.css";

const HeroSection=()=>{
  return (
    <div className="herosection">
      <video width="100%" loop autoPlay muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default HeroSection;
