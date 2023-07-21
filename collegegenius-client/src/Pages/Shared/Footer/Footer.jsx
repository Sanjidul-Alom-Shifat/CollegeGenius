// import React from 'react';
import { BiTime } from "react-icons/bi";
import {
    FaFacebookF,
    FaHome,
    FaInstagram,
    FaPhoneAlt,
    FaPinterest,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";


const Footer = () => {

    const theme = 'white';

    return (
        <footer className="p-10 bg-base-300">
            <div className="footer container py-4 lg:px-7 justify-between">
                <div>
                    <div className="flex items-center mb-5">
                        <div className="w-10 h-10 rounded-full gradient-bg grid place-content-center">
                            <div className="w-8 h-8 rounded-full bg-base-200 text-center font-bold text-2xl text-neutral">
                                C
                            </div>
                        </div>
                        <h2
                            className={`ml-2 text-2xl font-bold ${theme === "dark" ? "text-white" : "gradient-text"
                                }`}
                        >
                            CollegeGenius
                        </h2>
                    </div>
                    <a className="link link-hover flex items-center text-base gap-2">
                        <FaFacebookF /> Facebook
                    </a>
                    <a className="link link-hover flex items-center text-base gap-2">
                        <FaInstagram /> Instagram
                    </a>
                    <a className="link link-hover flex items-center text-base gap-2">
                        <FaPinterest /> Pinterest
                    </a>
                </div>
                <div>
                    <span
                        className="footer-title opacity-100 text-lg font-semibold"
                        data-aos="zoom-in"
                    >
                        INFORMATION
                    </span>
                    <a className="link text-base link-hover">About Search</a>
                    <a className="link text-base link-hover">Privacy Policy</a>
                    <a className="link text-base link-hover">Terms & Condition</a>
                    <a className="link text-base link-hover">Faq & Help</a>
                    <a className="link text-base link-hover">Refund & Return</a>
                </div>
                <div>
                    <span
                        className="footer-title opacity-100 text-lg font-semibold"
                        data-aos="zoom-in"
                    >
                        SUPPORT
                    </span>
                    <a className="link text-base link-hover">Chat Support</a>
                    <a className="link text-base link-hover">Terms of Support</a>
                    <a className="link text-base link-hover">Press Release</a>
                    <a className="link text-base link-hover">Star Support</a>
                </div>
                <div>
                    <span
                        className="footer-title opacity-100 text-lg font-semibold"
                        data-aos="zoom-in"
                    >
                        CONTACT US
                    </span>
                    <p className="flex items-center text-base gap-2">
                        <FaHome /> Chittagong, Bangladesh
                    </p>
                    <p className="flex items-center text-base gap-2">
                        <FaPhoneAlt /> +444 555 666 777
                    </p>
                    <p className="flex items-center text-base gap-2">
                        <BiTime /> 9.00AM - 6.00PM
                    </p>
                    <a className="link link-hover flex text-base items-center gap-2">
                        <HiMail /> collegegenius@gmail.com
                    </a>
                </div>
            </div>
            <div className="footer footer-center text-base p-4 border-t">
                <div>
                    <p>Copyright © 2023 - All right reserved by Sanjidul Alom Shifat</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;