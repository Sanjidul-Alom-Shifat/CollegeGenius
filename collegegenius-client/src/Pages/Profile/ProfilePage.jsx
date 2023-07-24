import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../Providers/AuthProvider';
import Spinner from '../../Components/Spinner';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ProfilePage = () => {

    const { user } = useContext(AuthContext);
    const { data, isLoading } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axios.get(
                `https://collegegenius-server.vercel.app/profile/${user?.email}`
            );
            return res.data;
        },
    });

    if (isLoading) return <Spinner />;

    return (
        <div className=' container'>

            <Helmet>
                <title>Profile Page | CollegeGenius</title>
            </Helmet>

            <div className='mt-28 lg:mt-32 mb-6'>
                {
                    data?.map((profile) => (
                        <div key={profile._id} className="max-w-lg mx-auto my-10 bg-white shadow-2xl rounded-lg  p-5">
                            <img className="w-40 h-40 rounded-full mx-auto" src={profile?.candidateImage ? profile.candidateImage : user.photoURL} alt="Profile picture" />
                            <h2 className="text-center text-2xl font-semibold font-mono mt-3">{profile?.candidateName}</h2>
                            <p className="text-center text-gray-600 mt-1 font-mono">CollegeGenius</p>
                            <div className="flex justify-center mt-5">
                                <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">Twitter</a>
                                <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">LinkedIn</a>
                                <a href="#" className="text-blue-500 font-mono hover:text-blue-700 mx-3">GitHub</a>
                            </div>
                            <div className="mt-5 px-4 space-y-1">
                                <h3 className="text-xl font-mono mb-2 font-semibold">Profile Bio</h3>
                                <p className="lg:text-lg text-justify font-medium font-mono"><span className='gradient-text'>Email : </span>{profile?.candidateEmail}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono"><span className='gradient-text'>University Name :</span> {profile?.candidatecollegeName}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono"><span className='gradient-text'>Date Of Birth :</span> {profile?.candidateDateofbirth}</p>
                                <p className="lg:text-lg text-justify font-medium font-mono mb-4"><span className='gradient-text'>Address :</span> {profile?.candidateAddress}</p>
                            </div>
                            <div className='mt-4'>
                                <button
                                    className="button1 "
                                >
                                    <Link to={`/updateProfile/${profile._id}`}>
                                        Edit Profile
                                    </Link>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ProfilePage;