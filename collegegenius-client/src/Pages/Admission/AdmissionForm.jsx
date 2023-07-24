// import React from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AdmissionForm = () => {

    const { user } = useContext(AuthContext);
    const alldata = useLoaderData();
    console.log(alldata);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=&key=${img_hosting_token}`;


    const onSubmit = (data) => {

        if (data.candidateNumber.length !== 11) {
            toast.error('Candidate phone number must be 11 characters.');
            return;
        }
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((imgResponse) => {
                if (imgResponse?.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);
                    const { candidateName, id, candidateEmail, cadidateSubject, candidatecollegeName, candidateNumber, candidateAddress, candidateDateofbirth } = data;
                    const newAdmission = {
                        candidateName: candidateName,
                        candidateEmail: candidateEmail,
                        userEmail: candidateEmail,
                        candidateImage: imgURL,
                        candidatecollegeName: candidatecollegeName,
                        cadidateSubject: cadidateSubject,
                        candidateNumber: candidateNumber,
                        candidateAddress: candidateAddress,
                        candidateDateofbirth: candidateDateofbirth,
                        candidateNewId: id,
                        collegeImage: alldata?.collegeImage,
                        admissionDate: alldata?.admissionDate,
                        admissionProcess: alldata?.admissionProcess,
                        events: alldata?.events,
                        researchWork: alldata?.researchWork,
                        researchHistory: alldata?.researchHistory,
                        researchLink: alldata?.researchLink,
                        researchNumber: alldata?.researchNumber,
                        sports: alldata?.sports,
                        Facilities: alldata?.Facilities
                    };
                    console.log(newAdmission);

                    axios.post('https://collegegenius-server.vercel.app/collegeadmission', newAdmission)
                        .then((data) => {
                            console.log('after adding new data', data.data)
                            if (data.data.insertedId) {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Admission successfull',
                                    showConfirmButton: true,
                                    // timer: 1500,
                                    confirmButtonText: 'Ok'
                                })
                                reset();
                                navigate('/admission');
                            }
                        })
                        .catch((error) => {
                            console.log('Error posting data:', error.message);
                            toast.error(error.message);
                        });

                }
            })
    }

    return (
        <div className='flex min-h-full flex-col justify-center px-4 py-8 lg:px-8 '>

            <Helmet>
                <title>Admission Form Page | CollegeGenius</title>
            </Helmet>

            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg p-4 md:p-7 rounded-lg shadow-2xl shadow-gray-500 dark:border-2 dark:bg-gray-800 dark:border-gray-700">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight gradient-text">Admission Form</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 mt-8'>
                    <div>
                        <label htmlFor="name" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Name</label>
                        <div className="input_group ">
                            <input
                                // type="text"
                                readOnly
                                defaultValue={user?.displayName}
                                name='name'
                                placeholder='Name'
                                {...register("candidateName", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Email</label>
                        <div className="input_group ">
                            <input
                                // type="email"
                                readOnly
                                defaultValue={user?.email}
                                name='email'
                                placeholder='Email'
                                {...register("candidateEmail", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div className='hidden'>
                        <label htmlFor="email" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Email</label>
                        <div className="input_group ">
                            <input
                                placeholder="Type here"
                                value={alldata._id}
                                className="input_text"
                                {...register("id")}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="college" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Name Of College</label>
                        <div className="input_group ">
                            <input
                                // type="text"
                                readOnly
                                defaultValue={alldata.collegeName}
                                name='candidatecollegeName'
                                placeholder='College Name'
                                {...register("candidatecollegeName", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Name Of Subject</label>
                        <div className="input_group ">
                            <select
                                required
                                className="input_text"
                                {...register("cadidateSubject", { required: true })}
                            >
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Computer Science Engineering">Computer Science Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Chemical Engineering">Chemical Engineering</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Phone Number</label>
                        <div className="input_group ">
                            <input
                                type="tel"
                                name='phonenumber'
                                placeholder='Phone Number 018XXXXXXXX'
                                {...register("candidateNumber", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Address</label>
                        <div className="input_group ">
                            <input
                                type="text"
                                name='candidateAddress'
                                placeholder='Candidate Address'
                                {...register("candidateAddress", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="dob" className="block mb-3 text-sm lg:text-lg font-medium font-mono text-gray-900 dark:text-white">Candidate Date Of Birth</label>
                        <div className="input_group">
                            <input
                                type="date"
                                name='candidateDateofbirth'
                                placeholder='Candidate Address'
                                {...register("candidateDateofbirth", { required: true })}
                                className="input_text"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text text-sm lg:text-lg font-medium font-mono">Candidate Image</span>
                        </label>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-accent w-full "
                            {...register("image", { required: true })}
                        />
                    </div>


                    {/* login buttons */}
                    <div className="mt-6">
                        <button type='submit' className="button">
                            Submit Admission Form
                        </button>
                    </div>

                </form>


            </div>

        </div>
    );
};

export default AdmissionForm;