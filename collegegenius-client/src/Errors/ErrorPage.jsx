// import React from 'react'
import { Link } from 'react-router-dom';
import image from '../assets/404.gif';
import logo from '../assets/abstract-blur-empty-green-gradient-studio-well-use-as-background-website-template-frame-business-report.jpg';

const ErrorPage = () => {

    return (
        <section className="bg-white dark:bg-gray-900 "
        style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover' }}
        >
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="wf-ull lg:w-1/2">
                    <p className="text-base font-semibold text-blue-500 dark:text-blue-400">404 error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesnt exist. Here are some helpful links :</p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Link to='/'>
                            <button className="flex items-center justify-center  px-5 py-2 text-sm text-gray-700 transition-colors duration-200 btn btn-gradient border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>


                                <span>Back To Homepage </span>
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
                    <img className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover " src={image} alt="" />
                </div>
            </div>
        </section>
    );
}

export default ErrorPage