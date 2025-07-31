import React from 'react';
import Header from '../components/Header';
import LatestFlights from '../components/LatestFlights';
import FAQs from '../components/FAQs';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';



const Home = () => {
    return (
        <div>
            <Header></Header>
            <LatestFlights></LatestFlights>
            <Features></Features>
            <Testimonials></Testimonials>
            <FAQs></FAQs>
            
        </div>
    );
};

export default Home;