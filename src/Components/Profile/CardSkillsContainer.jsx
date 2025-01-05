import { useEffect } from 'react';
import CardSkills from "./CardSkills";

function CardSkillsContainer({ 
    setIsRenderAllSkills,
    isRenderAllSkills, 
    toLearnProfileData, 
    toTeachProfileData
}) {
    const showSkillsToggleBg = {
        hover: 'hover:from-blue-600 hover:via-blue-800 hover:to-blue-800',
        initial: 'from-blue-400 via-blue-500 to-blue-600'
    };
    return(
        <div className='h-full w-full flex flex-col justify-between'>
            <CardSkills profileData={toLearnProfileData} isRenderAllSkills={isRenderAllSkills} type={'To learn:'} />
            <CardSkills profileData={toTeachProfileData} isRenderAllSkills={isRenderAllSkills} type={'To teach:'} />
            <button 
                className={`${isRenderAllSkills ? 'relative rounded-t-lg': 'absolute top-0 rounded-b-lg'} bg-gradient-to-r ${showSkillsToggleBg.hover} ${showSkillsToggleBg.initial} w-1/2 self-center text-sm text-white cursor-pointer`}
                onClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
            >
                {isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
            </button>
        </div>
    );
};

export default CardSkillsContainer;