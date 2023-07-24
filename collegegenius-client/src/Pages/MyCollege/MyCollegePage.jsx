// import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../../Components/PageHeader';
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import axios from 'axios';
import Spinner from '../../Components/Spinner';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Fade } from 'react-awesome-reveal';
import SectionHeader from '../../Components/SectionHeader';
// import SectionHeader from '../../Components/SectionHeader';

const MyCollegePage = () => {

    const { user } = useContext(AuthContext);

    const { data, isLoading } = useQuery({
        queryKey: ["mycollege", user?.email],
        queryFn: async () => {
            const res = await axios.get(
                `https://collegegenius-server.vercel.app/mycollege/${user?.email}`
            );
            return res.data;
        },
    });


    // { console.log(data) }
    { console.log(data) }

    if (isLoading) return <Spinner />;


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

            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-max lg:h-[650px] pt-2  mt-4 lg:mt-0 pb-5 lg:py-0">
                <div className="w-full lg:w-4/5 mx-auto p-6 rounded-xl bg-neutral/5">
                    <img
                        src={data.collegeImage}
                        alt=""
                        className="w-full aspect-square object-cover object-center"
                    />
                </div>
                <div className="space-y-3 md:space-y-5 lg:space-y-8">
                    <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl xl:text-7xl py-1 leading-snug">
                        <Fade cascade damping={0.1} className="inline">
                            <span className="gradient-text">
                                {data.candidatecollegeName}
                            </span>
                        </Fade>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl pb-1 lg:pb-4">
                        <span>Candidate Name : {data.candidateName}</span> <br />
                        <span>Subject : {data.cadidateSubject}</span><br />
                        <span>Research : {data.researchHistory}</span>
                    </p>
                    <Link
                        to={`/feedbacks/${data._id}`}
                        className="btn md:btn-lg btn-gradient rounded-full"
                    >
                        Give Reviews
                    </Link>
                </div>
            </div>

            <div className='container mx-auto  mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12'>

                <SectionHeader header="College Facilities"></SectionHeader>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.Facilities.map((event, index) => (
                        <div key={index} className="card full bg-base-100 shadow-xl">
                            <figure>
                                <img src={event.image} className="w-full h-60" alt="PopularCollege" />
                            </figure>
                            <div className="card-body l">
                                <p className="lg:text-lg text-justify font-medium font-mono">Name : {event.name}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono">Event Details : {event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className='mx-auto container mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12'>

                <SectionHeader header="College Event's"></SectionHeader>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.events.map((event, index) => (
                        <div key={index} className="card full bg-base-100 shadow-xl">
                            <figure>
                                <img src={event.eventImage} className="w-full h-60" alt="PopularCollege" />
                            </figure>
                            <div className="card-body l">
                                <p className="lg:text-lg text-justify font-medium font-mono">Name : {event.eventName}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono">Event Details : {event.eventDetails}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <div className='mx-auto container mt-4 mb-8 md:mt-6 lg:mt-8 md:mb-10 lg:mb-16'>

                <SectionHeader header="Sport's Categories"></SectionHeader>

                <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.sports.map((sport, index) => (
                        <div key={index} className="card full bg-base-100 shadow-xl">
                            <figure>
                                <img src={sport.sportImage} className="w-full h-60" alt="PopularCollege" />
                            </figure>
                            <div className="card-body l">
                                <p className="lg:text-lg text-justify font-medium font-mono">Name : {sport.sportName}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono">Sports Details : {sport.sportDetails}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default MyCollegePage;