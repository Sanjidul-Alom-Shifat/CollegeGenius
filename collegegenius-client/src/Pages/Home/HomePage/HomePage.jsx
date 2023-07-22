// import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Gallery from '../Gallery/Gallery';
import ResearchHistory from '../ResearchHistory/ResearchHistory';

const HomePage = () => {
    return (
        <div>

            <Helmet>
                <title>Home Page | CollegeGenius</title>
            </Helmet>

            <Banner></Banner>



            <Gallery></Gallery>

            <ResearchHistory></ResearchHistory>

        </div>
    );
};

export default HomePage;