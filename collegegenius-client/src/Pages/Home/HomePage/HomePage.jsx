// import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Gallery from '../Gallery/Gallery';
import ResearchHistory from '../ResearchHistory/ResearchHistory';
import PopularCollege from '../PopularCollege/PopularCollege';
import Reviews from '../Reviews/Reviews';

const HomePage = () => {
    return (
        <div>

            <Helmet>
                <title>Home Page | CollegeGenius</title>
            </Helmet>

            <Banner></Banner>

            <PopularCollege></PopularCollege>

            <Gallery></Gallery>

            <ResearchHistory></ResearchHistory>

            <Reviews></Reviews>

        </div>
    );
};

export default HomePage;