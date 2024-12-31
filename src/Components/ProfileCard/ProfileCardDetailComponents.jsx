import { useState, useEffect } from 'react';
import { RenderProfileDetails } from './RenderProfileData';
import ProfileSkillsContainer from './ProfileSkillsContainer';

function ProfileCardMobileComponents({ username }) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [toLearnProfileData, setToLearnProfileData] = useState();
    const [toTeachProfileData, setToTeachProfileData] = useState();

    useEffect(() => {
        isRenderAllSkills && fetchProfileSkills();
    }, [isRenderAllSkills]);

    async function fetchProfileSkills() {
        const response = await fetch(`http://localhost:3000/fetch-profile-skills`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username })
        });
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
        <div className='relative h-full w-full flex flex-col justify-between text-stone-400'>
            <RenderProfileDetails isRenderAllSkills={isRenderAllSkills} />
            <ProfileSkillsContainer 
                toLearnProfileData={toLearnProfileData} 
                toTeachProfileData={toTeachProfileData} 
                isRenderAllSkills={isRenderAllSkills}
                setIsRenderAllSkills={setIsRenderAllSkills}
            />
        </div>
    );
};

export default ProfileCardMobileComponents;