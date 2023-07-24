import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const SignIn = () => {

    const { setLoading, LoginUser, GoogleSignIn, resetPassword, GithubSignIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const onSubmit = (data) => {
        LoginUser(data.email, data.password)
            .then((result) => {
                const LoggedUser = result.user;
                console.log(LoggedUser);
                // toast.success('Login Successfully');
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'User login successfully.',
                    showConfirmButton: true,
                    // timer: 1500
                });
                navigate(from, { replace: true });

            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.message;
                toast.error(error.message);
                console.log(errorMessage);
            })
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
                        "https://collegegenius-server.vercel.app/users",
                        usersData
                    )
                    .then((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User login successfully by google.',
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

    //   handle password reset
    const handleReset = () => {
        const fromData = getValues();
        const email = fromData.email;
        console.log(email)

        resetPassword(email)
            .then(() => {
                toast.success('Please check your email for reset link')
                // setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                // console.log(err.message)
                toast.error(err.message)
            })
    }

    const HandleGitHubLogin = () => {
        GithubSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const usersData = {
                    name: loggedUser.displayName,
                    email: loggedUser.email,
                    image: loggedUser.photoURL,
                    role: "student",
                };

                axios
                    .post(
                        "https://collegegenius-server.vercel.app/users",
                        usersData
                    )
                    .then((res) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User login successfully by github.',
                            showConfirmButton: true,
                            // timer: 1500
                        });
                        console.log(res.data);
                        navigate(from, { replace: true });
                    });
            })
            .catch(error => {
                const ErrorMessage = error.message;
                toast.error(ErrorMessage);
            })
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-4 py-8 lg:px-8 ">

            <Helmet>
                <title>CollegeGenius | SignIn Page</title>
            </Helmet>

            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm p-4 md:p-7 rounded-lg shadow-gray-500 shadow-2xl dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign In</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-7'>
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
                        <label htmlFor="password" className="block mb-3 text-xm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="input_group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                placeholder='password'
                                className="input_text"
                                required
                                {...register("password", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input onChange={handleShowPassword} id="sremember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Show Password</label>
                            </div>
                        </div>
                        <a
                            onClick={handleReset}
                            className="text-sm cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Forget password?
                        </a>

                    </div>

                    {/* login buttons */}
                    <div className="">
                        <button type='submit' className="button">
                            Sign In
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
                        <button onClick={HandleGitHubLogin} type='button' className="button_custom rounded-md font-semibold">
                            Sign In with GitHub <FaGithub className='h-6 w-9'></FaGithub>
                        </button>
                    </div>

                </form>

                {/* bottom */}
                <div className="mt-7 mb-6 text-sm flex justify-between items-center text-[#002D74]">
                    <p>Don<span>&#39;</span>t have an account?</p>
                    <Link to="/signup">
                        <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default SignIn;