import { useState, useEffect } from 'react';
import RenderProfileSkills from './RenderProfileSkills';

function ProfileCardMobileComponents({ username, skills }) {
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
        console.log(data);
    };

    return(
        <div className='relative h-full w-full flex flex-col justify-between'>
            <div className={`${isRenderAllSkills ? 'block': 'hidden'} relative h-1/3`}>
                <p className='ml-2.5 text-xl font-bold'>To learn:</p>
                <ul className={`${isRenderAllSkills ? 'block': 'hidden'} relative h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar`}>
                    <RenderProfileSkills profileData={toLearnProfileData} />               
                </ul>
            </div>
            <div className={`${isRenderAllSkills ? 'block': 'hidden'} h-1/3`}>
                <p className='ml-2.5 pb-0 text-large font-bold'>To teach:</p>
                <ul className={`h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar`}>
                    <RenderProfileSkills profileData={toTeachProfileData} />
                </ul>
            </div>
            <button 
                className={`${isRenderAllSkills ? 'relative': 'absolute top-0'} w-1/2 self-center text-sm bg-stone-950 text-stone-300 cursor-pointer`}
                onClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
            >
                {isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
            </button>
        </div>
    );
};

export default ProfileCardMobileComponents;