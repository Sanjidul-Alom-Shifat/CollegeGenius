// import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../Components/PageHeader';
import { Link } from "react-router-dom";

const AdmissionPage = () => {
    return (
        <div>

            <Helmet>
                <title>Admission Page | CollegeGenius</title>
            </Helmet>

            <PageHeader title="Admission Page">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>Admission</li>
            </PageHeader>

            

        </div>
    );
};

export default AdmissionPage;