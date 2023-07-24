// import React from 'react';
import { useQuery } from 'react-query';
import SectionHeader from '../../../Components/SectionHeader';
import axios from 'axios';
import Spinner from '../../../Components/Spinner';

const ResearchHistory = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["research"],
        queryFn: async () => {
            const res = await axios.get(
                "https://collegegenius-server.vercel.app/research"
            );
            return res.data;
        },
    });

    if (isLoading) return <Spinner />;

    return (
        <div className='container mx-auto p-4 mt-4 mb-5 md:mt-6 lg:mt-8 md:mb-6 lg:mb-10'>

            <SectionHeader header="Research History"></SectionHeader>

            <p className="max-w-3xl mx-2 md:mx-auto md:text-lg text-justify md:text-center mb-5 md:mb-6 lg:mb-8">
                Decades of innovative research, driving knowledge and pushing scientific boundaries. A legacy of impactful contributions to various fields of study.
            </p>

            <div className="grid grid-cols-1 lg:mt-7 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.map((research) => (
                    <div key={research._id} className="card full bg-base-100 shadow-2xl">
                        <div className="card-body">
                            <p className="lg:text-lg font-medium font-mono"><span className=''>College Name : </span>{research.collegeName}</p>
                            <p className="lg:text-lg font-medium font-mono">Research History : {research.researchHistory}</p>
                            <p className="lg:text-lg font-medium font-mono">Research Paper Link : <a target='_blank' className='gradient-anchortext underline' href={research.researchLink} rel="noreferrer">{research.collegeName}</a> </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ResearchHistory;