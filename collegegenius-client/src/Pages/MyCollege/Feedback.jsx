// import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Feedback = () => {

    const id = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { feedback, ratings } = data;
        const collegeInfo = {
            feedback: feedback,
            ratings: parseFloat(ratings)
        };
        console.log(collegeInfo);
        axios.put(`https://collegegenius-server.vercel.app/mycollege/feedback/${data.id}`, collegeInfo)
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    reset();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Feedback successfully updated.',
                        showConfirmButton: true,
                        // timer: 1500
                    });
                    navigate('/mycollege');
                }
            })
    }

    return (
        <div className='flex min-h-full flex-col justify-center px-4 py-8 lg:px-8'>

            <Helmet>
                <title>Feedback Page | CollegeGenius</title>
            </Helmet>

            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-7 rounded-lg shadow-2xl shadow-gray-500 dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight gradient-text">Give Reviews</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-8'>
                    <div>
                        <label className="block mb-3  text-lg font-medium text-gray-900 dark:text-white">College Feedback :</label>
                        <div className="input_group ">
                            <textarea
                                placeholder="Give College Feedback"
                                required
                                className="input_text h-44"
                                {...register("feedback")}
                            />
                        </div>
                    </div>
                    <div className='hidden'>
                        <label htmlFor="id" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Email</label>
                        <div className="input_group ">
                            <input
                                placeholder="Type here"
                                value={id.id}
                                className="input_text"
                                {...register("id")}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Name Of Colleges</label>
                        <div className="input_group ">
                            <select
                                required
                                className="input_text"
                                {...register("ratings", { required: true })}
                            >
                                <option value="5">5</option>
                                <option value="4.5">4.5</option>
                                <option value="4">4</option>
                                <option value="3.5">3.5</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                            </select>
                        </div>
                    </div>

                    {/* login buttons */}
                    <div className="mt-6">
                        <button type='submit' className="button">
                            Update Profile
                        </button>
                    </div>

                </form>


            </div>



        </div>
    );
};

export default Feedback;