import { useState, useEffect } from 'react';
import CardSkills from './CardSkills';
import Button from '../../commonComponents/Button';

function CardDetails({ 
    username, 
    description,
    requests,
    sendMatchRequest,
    fetchRequests, 
}) {
    const [isRenderAllSkills, setIsRenderAllSkills] = useState(false);
    const [toLearnProfileData, setToLearnProfileData] = useState();
    const [toTeachProfileData, setToTeachProfileData] = useState();
    const [requested, setRequested] = useState(false);
    const [isMatchHovered, setIsMatchHovered] = useState(false);

    const showSkillsToggleBg = {
        hover: 'hover:from-blue-600 hover:via-blue-800 hover:to-blue-800',
        initial: 'from-blue-400 via-blue-500 to-blue-600'
    };

    const buttonBg = {
        matchRequestHover: 'bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600',
        matchRequest: 'from-green-400 via-green-500 to-green-600'

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

    function handleClick() {
        //Passed the match request function inside of the state because I can't figure out how to update the state immediately.
        //Don't know if this is okay.
        const newState = !requested;
        setRequested(newState);
        sendMatchRequest(newState);
        fetchRequests(requested);       
    };

    //toggle between displaying a users details or associated skills
    return(
        <div className='relative h-full w-2/3 flex flex-col justify-between'>
            {/* display users associated skills on card */}
            <div 
                className={`${isRenderAllSkills ? 'block' : 'hidden'} h-full w-full flex flex-col gap-2.5 overflow-x-auto`}
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
            {localStorage.getItem('user') && 
                <div className='w-1/2 absolute bottom-2.5 left-1/2 transform -translate-x-1/2'>
                    <Button 
                        styles={`${isMatchHovered ? 'block' : 'hidden'} ${isRenderAllSkills ? 'relative rounded-t-lg': 'rounded-b-lg'} w-full py-2.5 bg-gradient-to-r hover:${buttonBg.matchRequestHover} hover:text-white hover:font-bold rounded-lg rounded-b-none`}
                        handleOnClick={() => setIsRenderAllSkills(!isRenderAllSkills)}
                        handleOnMouseOver={() => setIsMatchHovered(true)}
                        handleOnMouseLeave={() => setIsMatchHovered(false)}
                        isHandleHover={true}
                        text={isRenderAllSkills ? 'Hide all skills' : 'Show all skills'}
                    />
                    <Button 
                        text='Send a match request'
                        handleOnClick={handleClick}
                        handleOnMouseOver={() => setIsMatchHovered(true)}
                        handleOnMouseLeave={() => setIsMatchHovered(false)}
                        isHandleHover={true}
                        styles={`w-full py-2.5 bg-gradient-to-r hover:${buttonBg.matchRequestHover} hover:text-white hover:font-bold rounded-lg ${isMatchHovered && 'rounded-t-none'}`}
                    />
                </div>
            }
        </div>
    );
};

export default CardDetails;