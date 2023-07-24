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
import PopularCollegeDetails from "../Pages/Home/PopularCollege/PopularCollegeDetails";
import CollegePageDetails from "../Pages/Colleges/CollegePageDetails";
import AdmissionForm from "../Pages/Admission/AdmissionForm";
import ProfilePage from "../Pages/Profile/ProfilePage";
import EditProfile from "../Pages/Profile/EditProfile";
import Feedback from "../Pages/MyCollege/Feedback";

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
                path: '/collegedetails/:id',
                element: <PrivateRoute><CollegePageDetails></CollegePageDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://collegegenius-server.vercel.app/collegesdetails/${params.id}`)
            },
            {
                path: '/popularcollegedetails/:id',
                element: <PrivateRoute><PopularCollegeDetails></PopularCollegeDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://collegegenius-server.vercel.app/popularcolleges/${params.id}`)
            },
            {
                path: '/admission',
                element: <AdmissionPage></AdmissionPage>
            },
            {
                path: '/admissionform/:id',
                element: <PrivateRoute><AdmissionForm></AdmissionForm></PrivateRoute>,
                loader: ({ params }) => fetch(`https://collegegenius-server.vercel.app/admission/${params.id}`)
            },
            {
                path: '/mycollege',
                element: <PrivateRoute><MyCollegePage></MyCollegePage></PrivateRoute>
            },
            {
                path: '/profile',
                element: <PrivateRoute><ProfilePage></ProfilePage></PrivateRoute>
            },
            {
                path: '/updateProfile/:id',
                element: <PrivateRoute><EditProfile></EditProfile></PrivateRoute>,
                loader: ({ params }) => fetch(`https://collegegenius-server.vercel.app/profiles/${params.id}`)
            },
            {
                path: '/feedbacks/:id',
                element: <PrivateRoute><Feedback></Feedback></PrivateRoute>
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