import { useState } from 'react';

function RenderProfileSkills({ profileData }) {
    const isSkills = profileData?.isSkills;

    if(profileData?.isSkills) {
        console.log('isSkills: ', profileData.isSkills);
    }
    return(
        <>
            {profileData?.skills.map(skill => 
            <li 
                className={`${!profileData.isSkills ? 'absolute transform -translate-x-1/2 -translate-y-1/2 ' : 'block'} top-1/2 left-1/2 text-white text-xs`} 
                key={skill}
            >
                {skill}
            </li>)}
        </>
    );
};

export default RenderProfileSkills;