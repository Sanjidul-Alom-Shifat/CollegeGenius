import React from 'react';
import SectionHeader from '../../../Components/SectionHeader';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Gallery = () => {

    const images = [
        'https://img.freepik.com/free-photo/portrait-three-smiling-graduate-friends-graduation-robes-university-campus-with-diploma_496169-1363.jpg?w=740&t=st=1690051961~exp=1690052561~hmac=8308514006e2f1d2016cbcd8cd0e0e7ae138ab183c44e85a6048a70fb170da1f',
        'https://img.freepik.com/free-photo/group-colleagues-with-diploma_23-2148522297.jpg?w=740&t=st=1690052045~exp=1690052645~hmac=3dce15eca953248ae3397b9d5f7fa6058448ae3f4349056f774e5f4b2425dbe2',
        'https://img.freepik.com/premium-photo/students-university-people-wearing-mantles-group-students_115086-788.jpg?w=740',
        'https://img.freepik.com/premium-photo/portrait-group-students-celebrating-their-graduation_23-2148201817.jpg?w=740',
        'https://img.freepik.com/premium-photo/graduates-stand-with-diplomas-lobby-university_85574-14580.jpg?w=740',
        'https://img.freepik.com/free-photo/group-students-celebrating-graduation-together-wearing-face-masks_1303-27693.jpg?w=740&t=st=1690052247~exp=1690052847~hmac=4b9523c20d24701b4001e98e4e9bfc6007c3fe0d4fbbea18898ff135d09609a4',
        'https://img.freepik.com/premium-photo/its-time-welcome-exciting-new-chapter-shot-student-holding-her-diploma-graduation-day_590464-63504.jpg?w=740',
        'https://img.freepik.com/premium-photo/happy-graduation-day-5-graduates-hold-his-graduate-diplomas-their-hands_115086-256.jpg?w=740',
        'https://img.freepik.com/premium-photo/working-world-here-we-come-shot-group-students-taking-selfies-with-mobile-phone-graduation-day_590464-12122.jpg?w=740'
        // Add more image URLs as needed
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false, // Hide dots on small devices

                },
            },
        ],
    };

    const sliderRef = React.useRef(null);

    const handlePause = () => {
        sliderRef.current.slickPause();
    };

    const handlePlay = () => {
        sliderRef.current.slickPlay();
    };

    return (
        <div className='container mx-auto p-4 mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-10'>

            <SectionHeader header="Graduate's Pictures"></SectionHeader>

            <p className="max-w-3xl mx-2 md:mx-auto md:text-lg text-justify md:text-center mb-8">
                Completing graduation brings happiness, marking the end of a significant academic journey. It's a time to celebrate achievements and embrace the future with optimism.
            </p>

            <Slider ref={sliderRef} {...settings} className="overflow-hidden">
                {images.map((image, index) => (
                    <div key={index} className="px-2">
                        <img src={image} alt={`Image ${index + 1}`} className="mx-auto rounded-lg h-64 w-full" />
                    </div>
                ))}
            </Slider>

            <div className="flex justify-center gap-6 mt-4">
                <button
                    className="bg-gradient-to-r from-blue-300 via-purple-300 to-rose-300 text-black font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePause}
                >
                    Pause Slider
                </button>
                <button
                    className="bg-gradient-to-r from-blue-300 via-purple-300 to-rose-300 text-black font-bold py-2 px-4 rounded"
                    onClick={handlePlay}
                >
                    Play Slider
                </button>
            </div>

        </div>
    );
};

export default Gallery;