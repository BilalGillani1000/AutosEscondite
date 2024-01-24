// import React from "react";
import Navbar from "../components/navbar";
import HeroSection from "../components/heroSection";
import ComboBox from "../components/idealCar";
import FeaturedCars from "../components/featuredCars";
import Event from "../components/events";
import Footer from "../components/footer";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

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
            <Box sx={{ width: '100%' }} textAlign={"center"}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    <Grid item xs={4}>
                    <FeaturedCars />
                    </Grid>
                    <Grid item xs={4}>
                    <FeaturedCars />
                    </Grid>
                    <Grid item xs={4}>
                    <FeaturedCars />
                    </Grid>
                    {/* <Grid item xs={6}>
                    <Item>4</Item>
                    </Grid> */}
                </Grid>
            </Box>
            
            <Event />
            <Event />
            <Event />
            <Footer />
        </div>
    );
}

export default Home;