import { useState, useEffect } from 'react';
import { Details } from './CardData';
import CardSkillsContainer from './CardSkillsContainer';

function CardDetails({ username, description }) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [toLearnProfileData, setToLearnProfileData] = useState();
    const [toTeachProfileData, setToTeachProfileData] = useState();

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
            <CardSkillsContainer 
                toLearnProfileData={toLearnProfileData} 
                toTeachProfileData={toTeachProfileData} 
                isRenderAllSkills={isRenderAllSkills}
                setIsRenderAllSkills={setIsRenderAllSkills}
            />
        </div>
    );
};

export default CardDetails;