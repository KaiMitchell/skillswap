// import skillCategories from "../../skillData/skills";
import { useEffect, useState } from 'react';

function UpdateSkillsList() {
    const [skills, setSkills] = useState();

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        const response = await fetch(`http://localhost:3000/fetch-skills`);
        const data = await response.json();
        setSkills(data.data);
    };

    return(
        <div className='h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar'>
            {skills?.map((obj) => {
                return(
                    <div key={obj.category} className='relative'>
                        <h3 className='sticky top-0 pl-1 text-large text-stone-400 bg-stone-900'>{obj.category}</h3> 
                        <ul className='bg-red-700'>
                            {obj.skills.map((skill) => {
                                return <li key={skill} className='pl-1 py-2 hover:bg-red-500 text-sm hover:cursor-pointer'>{skill}</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

function CurrentSkillsList() {
    const [skills, setSkills] = useState();

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills() {
        const response = await fetch(`http://localhost:3000/fetch-skills`);
        const data = await response.json();
        setSkills(data.data);
    };
    
    return(
        <div className='h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar'>
            {skills?.map((obj) => {
                return(
                    <div key={obj.category} className='relative'>
                        <h3 className='sticky top-0 pl-1 text-large text-stone-400 bg-stone-900'>Current</h3> 
                        <ul className='bg-red-700'>
                            {obj.skills.map((skill) => {
                                return <li key={skill} className='pl-1 py-2 hover:bg-red-500 text-sm hover:cursor-pointer'>current</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export {
    CurrentSkillsList,
    UpdateSkillsList
};