import { useState, useEffect } from 'react';
import CardSkills from './CardSkills';
import Button from '../../commonComponents/Button';

const apiUrl = import.meta.env.VITE_API_URL;

function CardDetails({ 
    username, 
    displayedSkill,
    sendMatchRequest,
    fetchRequests,
    defaultProfileImg,
    profileData, 
    isToLearn,
    imgPath,
    isSendingRequest,
    setIsSendingRequest,
    setIsSignInPrompt,
    setIsDisabled,
    isDisabled,
}) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [toLearnProfileData, setToLearnProfileData] = useState();
    const [toTeachProfileData, setToTeachProfileData] = useState();
    const [requested, setRequested] = useState(false);
    const [isMatchHovered, setIsMatchHovered] = useState(false);

    const buttonBg = {
        matchRequestHover: 'bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600',
        matchRequest: 'from-green-400 via-green-500 to-green-600'
    };

    useEffect(() => {   
        isRenderAllSkills && fetchProfileSkills();
    }, [isRenderAllSkills]);

    async function fetchProfileSkills() {
        const response = await fetch(`${apiUrl}/api/fetch-profile-skills?username=${username}`);
        const data = await response.json();

        if(data.status === 404) {
            console.log(data.error);
            setIsRenderAllSkills(false);
            return;
        };

        setToLearnProfileData(data.toLearn);
        setToTeachProfileData(data.toTeach);
    };

    function handleClick() {
        if(localStorage.getItem('user')) {
            //user feedback
            setIsSendingRequest(true);
            //Passed the match request function inside of the state because I can't figure out how to update the state immediately.
            //Don't know if this is okay.
            const newState = !requested;
            setRequested(newState);
            sendMatchRequest(newState);
            fetchRequests(requested);       
        } else {
            setIsSignInPrompt(true);
        };
    };

    //toggle between displaying a users details or associated skills
    return(
        <div className='relative h-full w-full flex flex-col gap-1 lg:w-2/3'>
            <div className='flex flex-col h-full gap-2'>
                <div className='flex'>  
                    <img 
                        className='size-20 rounded-full shadow-sm shadow-black object-scale-down bg-white sm:block lg:hidden' 
                        src={profileData?.profile_picture ? imgPath : defaultProfileImg} 
                    />      
                    <div className='ml-2.5 mt-2.5 grow'>
                        <h1 className={`text-xl font-extrabold`}>{username}</h1>
                        <p className='text-xs'>preference: in person</p>
                    </div>
                </div>
                {isRenderAllSkills ? 
                    <div 
                        className={`flex flex-col justify-center gap-1 w-full grow`}
                        // onMouseLeave={() => setIsRenderAllSkills(false)}
                    >
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
                    </div>
                :
                    <div className='w-full grow flex justify-center items-center sm:justify-start lg:gap-2.5'>
                        <div className={`ml-5 mt-2.5`}>
                            <p className={`${isRenderAllSkills && 'text-xs'}`}>primary skill to {isToLearn ? 'learn' : 'teach'}:</p>
                            <h2 className={`${isRenderAllSkills ? 'text-large lg:text-xl' : 'text-xl lg:text-3xl '} font-extrabold`}>{displayedSkill}</h2>
                        </div>
                    </div>
                }
                {/* display users associated skills on card */}
            </div>
            <div className={`flex ${isMatchHovered || !isRenderAllSkills && 'flex-row-reverse'} w-full`}>
                <Button 
                    styles={`${isRenderAllSkills || isMatchHovered ? 'block' : 'hidden'} w-1/2 py-2 bg-gradient-to-r text-sm hover:${buttonBg.matchRequestHover} hover:text-white lg:text-base lg:py-2.5`}
                    handleOnClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
                    handleOnMouseOver={() => setIsMatchHovered(true)}
                    handleOnMouseLeave={() => setIsMatchHovered(false)}
                    isHandleHover={true}
                    text={isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
                />
                <Button 
                    text={`${!isSendingRequest ? 'Send a match request' : 'sending request'}`}
                    handleOnClick={handleClick}
                    handleOnMouseOver={() => setIsMatchHovered(true)}
                    handleOnMouseLeave={() => setIsMatchHovered(false)}
                    isHandleHover={true}
                    isDisabled={isDisabled}
                    styles={`w-1/2 py-2 text-sm bg-gradient-to-r hover:${buttonBg.matchRequestHover} hover:text-white lg:text-base lg:py-2.5`}
                />
            </div>
        </div>
    );
};

export default CardDetails;