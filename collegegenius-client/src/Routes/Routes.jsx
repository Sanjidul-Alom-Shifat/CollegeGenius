import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/Home/HomePage/HomePage";
import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import ErrorPage from "../Errors/ErrorPage";
import CollegePage from "../Pages/Colleges/CollegePage";
import AdmissionPage from "../Pages/Admission/AdmissionPage";
import PrivateRoute from "./PrivateRoute";
import MyCollegePage from "../Pages/MyCollege/MyCollegePage";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/colleges',
                element: <CollegePage></CollegePage>
            },
            {
                path: '/admission',
                element: <AdmissionPage></AdmissionPage>
            },
            {
                path: '/mycollege',
                element: <PrivateRoute><MyCollegePage></MyCollegePage></PrivateRoute>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])

export default router;