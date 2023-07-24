// import React from 'react';
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

const contents = [
    {
        "id": '02',
        "image": "https://images.shiksha.com/mediadata/images/1547028804phpWVOFMG.jpeg",
        "caption": "Discover of your creative vision",
        "description": "Join CollegeGenius and master the skills to capture stunning college."
    },
];

const Banner = () => {
    return (
        <Swiper
            grabCursor
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 6000,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            {contents.map((item) => (
                <SwiperSlide key={item.id}>
                    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-max lg:h-[650px] pt-8 mt-16 pb-12 lg:py-0">
                        <div className="w-full lg:w-4/5 mx-auto p-6 rounded-xl bg-neutral/5">
                            <img
                                src={item.image}
                                alt=""
                                className="w-full aspect-square object-cover object-center"
                            />
                        </div>
                        <div className="space-y-3 md:space-y-5 lg:space-y-8">
                            <h1 className="font-extrabold text-3xl md:text-4xl lg:text-6xl xl:text-7xl py-1 leading-snug">
                                <Fade cascade damping={0.1} className="inline">
                                    {item.caption.split(" ").map((a, i) => (
                                        <span key={i} className="gradient-text">
                                            {a}{" "}
                                        </span>
                                    ))}
                                </Fade>
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl pb-1 lg:pb-4">
                                {item.description}
                            </p>
                            <Link
                                to="/colleges"
                                className="btn md:btn-lg btn-gradient rounded-full"
                            >
                                Explore Colleges
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Banner;