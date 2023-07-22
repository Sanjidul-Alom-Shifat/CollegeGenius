// import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../Components/PageHeader';
import { Link } from "react-router-dom";

const MyCollegePage = () => {
    return (
        <div>

            <Helmet>
                <title>My College Page | CollegeGenius</title>
            </Helmet>

            <PageHeader title="My College">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>My College</li>
            </PageHeader>

        </div>
    );
};

export default MyCollegePage;