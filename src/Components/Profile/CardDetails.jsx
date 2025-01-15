import { useState, useEffect } from 'react';
import CardSkills from './CardSkills';
import Button from '../../commonComponents/Button';

function CardDetails({ username, description }) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [toLearnProfileData, setToLearnProfileData] = useState();
    const [toTeachProfileData, setToTeachProfileData] = useState();

    const showSkillsToggleBg = {
        hover: 'hover:from-blue-600 hover:via-blue-800 hover:to-blue-800',
        initial: 'from-blue-400 via-blue-500 to-blue-600'
    };

    useEffect(() => {
        isRenderAllSkills && fetchProfileSkills();
    }, [isRenderAllSkills]);

    async function fetchProfileSkills() {

        const response = await fetch(`http://localhost:3000/fetch-profile-skills?username=${username}`);
        const data = await response.json();

        if(data.status === 404) {
            console.log(data.error);
            setIsRenderAllSkills(false);
            return;
        };

        setToLearnProfileData(data.toLearn);
        setToTeachProfileData(data.toTeach);
    };

    //toggle between displaying a users details or associated skills
    return(
        <div className='relative h-full w-full flex flex-col justify-between'>
            {/* display user details on card */}
            <div className={`${isRenderAllSkills ? 'hidden' : 'block'} flex flex-col gap-2.5 mt-10 h-full w-full px-5`}>
                <div className='flex gap-2.5 items-center'>
                    <h3>Preferrence:</h3>
                    <p className='text-xs'>In person</p>
                </div>
                <div className='h-16'>
                    <div className='relative h-full overflow-y-auto no-scrollbar'>
                        <p className=''>{description}</p>
                    </div>
                </div>
            </div>
            {/* display users associated skills on card */}
            <div className='h-full w-full flex flex-col justify-between'>
                <CardSkills 
                    profileData={toLearnProfileData} 
                    isRenderAllSkills={isRenderAllSkills} 
                    type={'To learn:'} 
                />
                <CardSkills 
                    profileData={toTeachProfileData} 
                    isRenderAllSkills={isRenderAllSkills} 
                    type={'To teach:'} 
                />
                <Button 
                    styles={`${isRenderAllSkills ? 'relative rounded-t-lg': 'absolute top-0 rounded-b-lg'} bg-gradient-to-r ${showSkillsToggleBg.hover} ${showSkillsToggleBg.initial} w-1/2 self-center text-sm text-white cursor-pointer`}
                    handleOnClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
                    text={isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
                />
            </div>
        </div>
    );
};

export default CardDetails;