import { useState, useEffect } from 'react';
import CardSkills from './CardSkills';
import Button from '../../commonComponents/Button';

function CardDetails({ 
    username, 
    displayedSkill,
    sendMatchRequest,
    fetchRequests, 
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

    //add line break after every word in displayed skilll
    function addLineBreak(str) {
        return str.split(' ').map((word) => word + '\n').join(' ');
    };

    addLineBreak(displayedSkill)

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
        <div className='relative h-full w-2/3 flex flex-col justify-center'>
            <div className={`${isRenderAllSkills ? 'hidden' : 'block'} ml-5 mt-2.5`}>
                <h2 className='text-3xl font-extrabold'>{addLineBreak(displayedSkill)}</h2>
            </div>
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
                <div className='flex w-full absolute bottom-0'>
                    <Button 
                        styles={`${isRenderAllSkills || isMatchHovered ? 'opacity-100' : 'opacity-0'} w-1/2 py-2.5 bg-gradient-to-r hover:${buttonBg.matchRequestHover} hover:text-white hover:font-bold`}
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
                        styles={`w-1/2 py-2.5 bg-gradient-to-r hover:${buttonBg.matchRequestHover} hover:text-white hover:font-bold rounded-br`}
                    />
                </div>
            }
        </div>
    );
};

export default CardDetails;