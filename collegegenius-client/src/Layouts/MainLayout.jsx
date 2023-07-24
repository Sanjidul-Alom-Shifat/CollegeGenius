// import React from 'react';
import { Outlet } from "react-router-dom";
import NavigationBar from "../Pages/Shared/NavigationBar/NavigationBar";
import Footer from "../Pages/Shared/Footer/Footer";

const MainLayout = () => {

    return (

        <div>

            <NavigationBar></NavigationBar>

            <div className='md:min-h-[calc(100vh-341px)]'>

                <Outlet></Outlet>
                
            </div>

            <Footer></Footer>

        </div>
    );
};

export default MainLayout;