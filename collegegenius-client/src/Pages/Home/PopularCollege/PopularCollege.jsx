// import React from 'react';
import { useQuery } from "react-query";
import SectionHeader from "../../../Components/SectionHeader";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Spinner";
import { useEffect, useState } from "react";

const PopularCollege = () => {

    const [datas, setDatas] = useState([]);
    const [searchText, setSearchText] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["popularcolleges"],
        queryFn: async () => {
            const res = await axios.get(
                "https://collegegenius-server.vercel.app/popularcolleges"
            );
            return res.data;
        },
    });

    // Use useEffect to update the datas state when data changes
    useEffect(() => {
        if (data) {
            setDatas(data);
        }
    }, [data]);

    // console.log(datas)

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://collegegenius-server.vercel.app/collegeName/${searchText}`);
            setDatas(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className='container mx-auto p-4 mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-12'>

            <SectionHeader header="Popular Colleges"></SectionHeader>

            <p className="max-w-3xl mx-2 md:mx-auto md:text-lg text-justify md:text-center mb-5">
                Discover top-rated colleges renowned for academic excellence and a dynamic campus experience, empowering students for a successful future.
            </p>

            <div className=" sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto ">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-rose-300 rounded-lg bg-gray-50 focus:ring-rose-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-rose-500 dark:focus:border-purple-500" placeholder="Search college by college name" required
                    />
                    <button onClick={handleSearch} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:mt-11 mt-7 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {datas.map((popular) => (
                    <div key={popular._id} className="card full bg-base-100 shadow-xl">
                        <figure>
                            <img src={popular.collegeImage} className="w-full h-60" alt="PopularCollege" />
                        </figure>
                        <div className="card-body l">
                            <p className="lg:text-lg text-justify font-medium font-mono">Name : {popular.collegeName}</p>
                            <p className="lg:text-lg text-justify font-medium font-mono">Admission Date : {popular.admissionDate}</p>
                            <p className="lg:text-lg text-justify font-medium font-mono">Events : {popular.events.map((event, index) => (index !== 0 ? ', ' : '') + event.eventName)}</p>
                            <p className="lg:text-lg text-justify font-medium font-mono">Research History : {popular.researchHistory}</p>
                            <p className="lg:text-lg text-justify font-medium font-mono">Sports : {popular.sports.map((sport, index) => (index !== 0 ? ', ' : '') + sport.sportName)}</p>

                            <div className="card-actions w-full justify-center mt-2">
                                <button
                                    className="button1"
                                >
                                    <Link to={`/popularcollegedetails/${popular._id}`}>
                                        College Details
                                    </Link>
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default PopularCollege;