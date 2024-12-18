import { useState, useEffect } from 'react';

function PickSkillsContainer() {

    //Temporary skill placeholder generation
    const [skills, setSkills] = useState([]);
    const arr = [];
    useEffect(() => {
        for(let i = 0; i < 10; i++) {
            arr.push('skill ' + i);
        };
        setSkills(arr);
    }, []);

    const categories = ['Communication', 'Knowledges', 'Customer service', 'Marketing', 'Project Management', 'Teamwork'];
    return(
        <div className='flex h-96 p-5 bg-stone-900 rounded-md'>
            {
                categories.map((item, index) => {
                    const bg = index % 2 === 0 ? 'stone' : 'red';                
                    return(
                        // If I use transition I can't open the accordion the the end... find out why. I need transitioning.    
                        <article key={index} className={`group rounded-md relative flex justify-center hover:justify-between w-10 hover:w-full items-center p-5 bg-${bg}-700 text-slate-100`}>
                            <div className='hidden group-hover:block w-fit text-center'>
                                <h2 className='hidden group-hover:block mb-2.5'>Select a skill</h2>
                                <ul className={`hidden w-full rounded-md group-hover:block h-64 px-10 group-hover:flex flex-col self-center justify-center items-center gap-5 bg-${bg}-600 shadow-inner overflow-y-scroll no-scrollbar`}>
                                    {skills.map(item => {
                                        return(
                                            <li key={item} className={`hover:text-slate-500 cursor-pointer w-full`}>{item}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='hidden group-hover:block h-full rounded-full border border-stone-900'></div>
                            <h3 className='text-xl group-hover:text-3xl group-hover:font-bold rotate-90 group-hover:rotate-0 text-nowrap'>{item}</h3>

                            <div className='hidden h-96 bg-green-500'>
                                
                            </div>
                        </article>
                    );
                })
            }
        </div>
    );
};

export default PickSkillsContainer;