import axios from 'axios';
import { useQuery } from 'react-query';
import Spinner from '../../../Components/Spinner';
import SectionHeader from '../../../Components/SectionHeader';

const Reviews = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
            const res = await axios.get(
                "https://collegegenius-server.vercel.app/reviews"
            );
            return res.data;
        },
    });

    if (isLoading) return <Spinner />;

    return (
        <div className='container mx-auto p-4 mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-10'>

            <SectionHeader header="Colleges Review's"></SectionHeader>

            <p className="max-w-3xl mx-2 md:mx-auto md:text-lg text-justify md:text-center mb-5 md:mb-6 lg:mb-8">
                Explore illuminating student and alumni reviews showcasing transformative experiences and vibrant college communities, revealing the lasting impact of education at each college.
            </p>

            <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.map((review) => (
                    <div key={review._id} className="card full bg-base-100 shadow-2xl">
                        <figure>
                            <img src={review.collegeImage} className="w-full h-60" alt="PopularCollege" />
                        </figure>
                        <div className="card-body">
                            <p className="lg:text-lg font-medium font-mono text-justify"><span className='gradient-text text-lg'>College Name :</span> {review.candidatecollegeName}</p>
                            <p className="lg:text-lg font-medium font-mono text-justify"><span className='gradient-text text-lg'>College Feedback :</span> {review.feedback}</p>
                            <p className="lg:text-lg font-medium font-mono"><span className='gradient-text text-lg'>College Rating :</span> {review.ratings} star</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Reviews;