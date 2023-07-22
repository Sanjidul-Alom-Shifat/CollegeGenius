import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const {
        CreateUser,
        UpdateUserData,
        GoogleSignIn,
        loading,
        setLoading,
        LogOutUser
    } = useContext(AuthContext);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setshowConfirmPassword(!showConfirmPassword);
    }

    const onSubmit = (data) => {

        if (data.password.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        if (data.password !== data.confirmpassword) {
            toast.error('Password and confirm password do not match.');
            return;
        }

        console.log(data);
        CreateUser(data?.email, data?.password)
            .then((result) => {
                const loggedUser = result.user;
                UpdateUserData(data?.name, data?.photoURL)
                    .then(() => {
                        const usersData = {
                            name: loggedUser.displayName,
                            email: loggedUser.email,
                            image: loggedUser.photoURL,
                            role: "student",
                        };
                        console.log("updated", usersData);

                        axios
                            .post(
                                "http://localhost:5000/users",
                                usersData
                            )
                            .then((res) => {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: true,
                                    // timer: 1500
                                });
                                reset();
                                console.log(res.data);
                                navigate(from, { replace: true });
                            });
                    })
                    .catch((error) => toast.error(error.message));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    const HandleGoogleLogin = () => {
        GoogleSignIn()
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);

                const usersData = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    image: loggedUser.photoURL,
                    role: "student",
                };

                axios
                    .post(
                        "http://localhost:5000/users",
                        usersData
                    )
                    .then((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        console.log(res.data);
                        navigate(from, { replace: true });
                    });
            })
            .catch(error => {
                const ErrorMessage = error.message;
                console.log(ErrorMessage)
                toast.error(error.message);
            })
    }

    return (

        <div className="flex min-h-full flex-col justify-center px-4 py-8 lg:px-8 ">

            <Helmet>
                <title>CollegeGenius | SignUp Page</title>
            </Helmet>

            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm p-4 md:p-7 rounded-lg shadow-2xl shadow-gray-500 dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
                    <div>
                        <label htmlFor="name" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Name</label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='name'
                                placeholder='Name'
                                {...register("name", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Email Address</label>
                        <div className="input_group ">
                            <input
                                type="email"
                                name='email'
                                placeholder='Email'
                                {...register("email", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Photo </label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='photoURL'
                                placeholder='Photo URL'
                                {...register("photoURL", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="input_group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder='Password'
                                className="input_text"
                                required
                                {...register("password", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleShowPassword} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                    </div>

                    {/* for confirm password */}
                    <div>
                        <label htmlFor="confirmpassword" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="input_group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmpassword'
                                placeholder='Confirm Password'
                                className="input_text"
                                required
                                {...register("confirmpassword", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleShowConfirmPassword} id="remembers" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                    </div>

                    {/* login buttons */}
                    <div className="">
                        <button type='submit' className="button">
                            Sign Up
                        </button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    <div className="input-button">
                        <button onClick={HandleGoogleLogin} type='button' className="button_custom rounded-md font-semibold">
                            Sign In with Google <FaGoogle className='h-6 w-9'></FaGoogle>
                        </button>
                    </div>
                    {/* TODO */}
                    <div className="input-button">
                        <button onClick={HandleGoogleLogin} type='button' className="button_custom rounded-md font-semibold">
                            Sign In with GitHub <FaGithub className='h-6 w-9'></FaGithub>
                        </button>
                    </div>

                </form>

                {/* bottom */}
                <div className="mt-7 mb-6 text-sm flex justify-between items-center text-[#002D74]">
                    <p>Already have an account?</p>
                    <Link to="/signin">
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>



        </div>
    );
};

export default SignUp;