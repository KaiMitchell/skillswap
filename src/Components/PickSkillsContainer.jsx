import { useState } from 'react';

function PickSkillsContainer() {

    const categories = ['Communication', 'Knowledges', 'Customer service', 'Marketing', 'Project Management', 'Teamwork'];
    return(
        <div className='flex h-96 p-5 bg-black rounded-md'>
            {
                categories.map((item, index) => {
                    const bg = index % 2 === 0 ? 'blue' : 'red';                
                    return(
                        // If I use transition I can't open the accordion the the end... find out why. I need transitioning.    
                        <article key={index} className={`group rounded-md relative flex justify-center hover:justify-between w-10 hover:w-full items-center p-5 bg-${bg}-500 text-white`}>
                            <ul className='hidden group-hover:block h-fit group-hover:flex flex-col items-center gap-5'>
                                <li>sub skill</li>
                                <li>sub skill</li>
                                <li>sub skill</li>
                                <li>sub skill</li>
                                <li>sub skill</li>
                            </ul>
                            <div className='hidden group-hover:block h-full border border-stone-700 bg-stone-700'></div>
                            <h3 className='text-xl group-hover:text-3xl group-hover:font-bold rotate-90 group-hover:rotate-0 text-nowrap'>{item}</h3>
                        </article>
                    );
                })
            }
        </div>
    );
};

export default PickSkillsContainer;