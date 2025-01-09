import { useState } from "react";

function SMList({ skill, handleSkill, text }) {
    //alter the stroke width of the delete button within the current skill list
    const [isButtonHover, setIsButtonHover] = useState(false);

    //dynamically set the function of the skills button
    const isAddSkill = text.includes('Pick');
    //set the boolean to determine if a user wants to learn or teach the selected skill
    const isAddSkillToLearn = text.includes('skills to learn');

    return(
        <li className='group flex justify-between items-center w-full px-1 py-2 text-sm hover:cursor-pointer'>
            <p className='group-hover:font-bold'>{skill}</p>
            {!isAddSkill &&
                <button 
                    onClick={() => handleSkill(skill)}
                    onMouseOver={() => setIsButtonHover(true)}
                    onMouseLeave={() => setIsButtonHover(false)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={isButtonHover ? 2.5 : 1.5} 
                        stroke="currentColor" 
                        className="hover:font-bold size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            }
            {isAddSkill &&
                <button 
                    onClick={() => handleSkill(skill, isAddSkillToLearn)}
                    onMouseOver={() => setIsButtonHover(true)}
                    onMouseLeave={() => setIsButtonHover(false)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={isButtonHover ? 2.5 : 1.5} 
                        stroke="currentColor" 
                        className="size-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            }
        </li>
    );
};

export default SMList;