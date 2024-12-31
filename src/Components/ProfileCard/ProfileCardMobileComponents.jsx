import { useState, useEffect } from 'react';

function ProfileCardMobileComponents({ username, skills }) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [allToLearnSkills, setAllToLearnSkills] = useState();
    const [allToTeachSkills, setAllToTeachSkills] = useState();

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
        setAllToLearnSkills(data.toLearn);
        if(data.toTeach == []) {
            setAllToTeachSkills(['no skills to teach']);
        } else {
            setAllToTeachSkills(data.toTeach);
        };
        console.log(data);
    };

    return(
        <div className='relative h-full w-full flex flex-col justify-between'>
            <div className={`${isRenderAllSkills ? 'block': 'hidden'} h-1/3`}>
                <p className='ml-2.5 text-xl font-bold'>To learn:</p>
                <ul className={`${isRenderAllSkills ? 'block': 'hidden'} h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar`}>
                    {allToLearnSkills?.map(skill => <li className='text-xs' key={skill}>{skill}</li>)}
                </ul>
            </div>
            <div className={`${isRenderAllSkills ? 'block': 'hidden'} h-1/3`}>
                <p className='ml-2.5 pb-0 text-large font-bold'>To teach:</p>
                <ul className={`h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar`}>
                    {allToTeachSkills?.map(skill => <li className='text-xs' key={skill}>{skill}</li>)}
                </ul>
            </div>
            <button 
                className={`${isRenderAllSkills ? 'relative': 'absolute top-0'} w-1/2 self-center text-sm bg-stone-950 text-stone-300 cursor-pointer`}
                onClick={() => setIsRenderAllSkills(true)}
            >
                    show all skills
            </button>
        </div>
    );
};

export default ProfileCardMobileComponents;