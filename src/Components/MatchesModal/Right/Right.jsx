import { useEffect, useState } from 'react';
import Button from '../../../commonComponents/Button';
import MapData from '../../../features/methods/MapData';
import HorizontalListItems from '../../../commonComponents/HorizontalListItems';

const apiUrl = import.meta.env.VITE_API_URL;

function Right({ 
    isHovered,
    setIsHovered,
    displayedProfile,
    fetchRequests,
    setIsDisplayedProfile,
    displayedProfileType,
    isMatched,
    isSent,
}) {

    //set a boolean to determine whether accept button should be rendered... if displaying a pending profile
    //do not render accept button
    let displayRequestSentTo = displayedProfileType === 'Pending matches';

    const buttonColor = {
        pendingProfile: 'from-rose-400 via-rose-500 to-rose-600',
        matchedOrRecievedProfile: 'from-blue-400 via-blue-500 to-blue-600'
    };

    let btnSvg =                                 
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={isHovered ? 2 : 1.5} 
            stroke="url(#svgGradient)" 
            className="size-8"
        >
            <defs>
                <linearGradient id="svgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#2563eb', stopOpacity: 1}} />
                </linearGradient>
            </defs> 
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>;

    let mainBtnText;
    let mainBtnClickHandler;

    //set appropriate values for top right button

    //text
    if(isMatched) mainBtnText = 'Connect';
    if(!isMatched && !displayRequestSentTo) mainBtnText = 'Accept';
    if(isSent) mainBtnText = 'Unsend';

    //handlers
    if(!isMatched) mainBtnClickHandler = acceptMatchRequest;
    if(isSent) mainBtnClickHandler = removeMatchRequests;

    //remove a pending match request you sent
    async function removeMatchRequests() {
        const username = localStorage.getItem('user');

        const response = await fetch(`${apiUrl}/api/handle-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('access token')}`
                },
            body: JSON.stringify({  
                currentUser: username, 
                selectedUser: displayedProfile?.username, 
                isRequested: false 
            })
        });

        setIsDisplayedProfile(false);
        fetchRequests(displayedProfile?.username);
    };

    //accept a match request sent to user
    async function acceptMatchRequest() {

        const username = localStorage.getItem('user');

        const response = await fetch(`${apiUrl}/api/accept-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('access token')}`
            },
            body: JSON.stringify({  
                currentUser: username, 
                selectedUser: displayedProfile?.username, 
            })
        });

        const data = await response.json();

        console.log('accept request response data: ', data);

        setIsDisplayedProfile(false);
        fetchRequests(displayedProfile?.username);
    };

    return(
        <div className="relative w-full sm:h-full h-1/2 flex flex-col gap-5 mt-2.5 sm:justify-between sm:w-1/2 sm:mt-0">
            <div className='flex flex-col gap-5 items-center sm:h-full w-full sm:items-end'>
                <div className='flex flex-col gap-2.5'>      
                    <div className='flex flex-col items-center gap-2.5'>
                        <p>Skills to offer</p>
                        <HorizontalListItems isMatchesModal={true} data={displayedProfile?.skills_to_teach} />
                    </div>
                    <div className='flex flex-col items-center gap-2.5'>
                        <p>Skills desired</p>
                        <HorizontalListItems isMatchesModal={true} data={displayedProfile?.skills_to_learn} />
                    </div>
                </div>
                <div className={`${isMatched && 'hidden'} relative group flex justify-between gap-2.5 sm:self-end`}>
                    <Button
                        text={mainBtnText}
                        handleOnClick={mainBtnClickHandler}
                        styles={`h-10 w-28 flex justify-center items-center rounded-lg text-white bg-gradient-to-r ${displayRequestSentTo || isSent ? buttonColor.pendingProfile : buttonColor.matchedOrRecievedProfile} cursor-pointer`}
                    />
                    {/* Message icon
                    {isMatched && 
                        <Button 
                            text={btnSvg} 
                            handleOnMouseLeave={() => setIsHovered(false)}
                            handleOnMouseOver={() => setIsHovered(true)}
                            handleOnClick={() => alert('clicked')}
                            isHandleHover={true}
                        />
                    }    */}
                    {!isSent && 
                        //decline a match request that has been sent to user
                        <Button 
                            text={'Decline'}
                            handleOnClick={removeMatchRequests}
                            styles={`h-10 w-28 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer`}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default Right;