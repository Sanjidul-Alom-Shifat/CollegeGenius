// import React from 'react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="loading loading-bars w-14 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default Spinner;