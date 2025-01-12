import { useState, useEffect } from 'react';
import { Details } from './CardData';
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

    return(
        <div className='relative h-full w-full flex flex-col justify-between'>
            <Details 
                description={description}
                isRenderAllSkills={isRenderAllSkills}       
            />
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