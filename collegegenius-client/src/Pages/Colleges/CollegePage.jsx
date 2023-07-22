// import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../Components/PageHeader';
import { Link } from "react-router-dom";

const CollegePage = () => {
    return (
        <div>

            <Helmet>
                <title>Colleges Page | CollegeGenius</title>
            </Helmet>

            <PageHeader title="Popular Colleges">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>Colleges</li>
            </PageHeader>

            

        </div>
    );
};

export default CollegePage;