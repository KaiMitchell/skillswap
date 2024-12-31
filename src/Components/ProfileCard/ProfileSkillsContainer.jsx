import { useEffect } from 'react';
import ProfileSkills from "./RenderProfileSkills";

function ProfileSkillsContainer({ 
    setIsRenderAllSkills,
    isRenderAllSkills, 
    toLearnProfileData, 
    toTeachProfileData
}) {
    return(
        <div className='h-full w-full flex flex-col justify-between'>
            <ProfileSkills profileData={toLearnProfileData} isRenderAllSkills={isRenderAllSkills} type={'To learn:'} />
            <ProfileSkills profileData={toTeachProfileData} isRenderAllSkills={isRenderAllSkills} type={'To teach:'} />
            <button 
                className={`${isRenderAllSkills ? 'relative': 'absolute top-0'} w-1/2 self-center text-sm bg-stone-950 text-stone-300 cursor-pointer`}
                onClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
            >
                {isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
            </button>
        </div>
    );
};

export default ProfileSkillsContainer;