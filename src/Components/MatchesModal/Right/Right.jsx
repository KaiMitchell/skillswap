import { useEffect, useState } from 'react';
import Button from '../../../commonComponents/Button';
import MapData from '../../../features/methods/MapData';
import HorizontalListItems from '../../../commonComponents/HorizontalListItems';

function Right({ 
    isHovered,
    setIsHovered,
    displayedProfile,
    fetchRequests,
    setIsDisplayedProfile,
    displayedProfileType,
    isMatched
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
    if(displayRequestSentTo) mainBtnText = 'Unsend';

    //handlers
    if(!isMatched) mainBtnClickHandler = acceptMatchRequest;
    if(displayRequestSentTo) mainBtnClickHandler = removeMatchRequests;

    //remove a pending match request you sent
    async function removeMatchRequests() {
        const username = localStorage.getItem('user');

        const response = await fetch(`http://localhost:3000/handle-match-request`, {
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

        const data = await response.json();

        setIsDisplayedProfile(false);
        fetchRequests(displayedProfile?.username);
    };

    //accept a match request sent to user
    async function acceptMatchRequest() {

        const username = localStorage.getItem('user');

        const response = await fetch(`http://localhost:3000/accept-match-request`, {
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
        <div className="w-1/2 h-full flex flex-col justify-between">
            <div className='flex flex-col gap-5 h-full w-full'>
                <div className='relative group self-end'>
                    <Button
                        text={mainBtnText}
                        handleOnClick={mainBtnClickHandler}
                        styles={`h-10 w-28 flex justify-center items-center rounded-lg text-white ${isMatched ? 'group-hover:font-semibold' : 'hover:font-semibold'} bg-gradient-to-r ${displayRequestSentTo ? buttonColor.pendingProfile : buttonColor.matchedOrRecievedProfile} cursor-pointer`}
                    />
                    <div className="hidden group-hover:flex items-center absolute right-full top-1/2 transform -translate-y-1/2">
                        {/* Message icon */}
                        {isMatched && 
                            <Button 
                                text={btnSvg} 
                                handleOnMouseLeave={() => setIsHovered(false)}
                                handleOnMouseOver={() => setIsHovered(true)}
                                handleOnClick={() => alert('clicked')}
                                isHandleHover={true}
                            />
                        }   
                        {!isMatched && !displayRequestSentTo && 
                            //decline a match request that has been sent to user
                            <Button 
                                text={'Decline'}
                                handleOnClick={removeMatchRequests}
                                styles={`h-10 w-28 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer`}
                            />
                        }
                        {/* arrow */}
                        {!displayRequestSentTo && 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                            </svg>
                        }
                    </div>
                </div>
                <article className='text-right'>
                    <h3 className='text-xl font-bold underline'>About</h3>
                    <p>
                        {displayedProfile?.description || 'No Description'}
                    </p>
                </article>
            </div>
            <div className='flex flex-col gap-2.5'>      
                <div className='flex items-center gap-2.5 text-nowrap'>
                    <HorizontalListItems data={displayedProfile?.skills_to_teach} />
                    <p>Skills to offer</p>
                </div>
                <div className='flex items-center gap-2.5 text-nowrap'>
                    <HorizontalListItems data={displayedProfile?.skills_to_learn} />
                    <p>Skills desired</p>
                </div>
            </div>
        </div>
    );
};

export default Right;