import { useEffect, useState } from "react";
import ProfileDropDownSidePopOut from "./ProfileDropDownSidePopOut.jsx";

function ProfileDropDownOption({ 
    skills, 
    fetchRequests,
    requests, 
    setUser, 
    text, 
    setIsSettings, 
    setIsShown
 }) { 
    //fetch data effect for individual pop outs due to re-rendering.
    useEffect(() => {
        text === 'Requests' && fetchRequests();
    }, []); 

    function handleClick() {
        localStorage.removeItem('user');
        setUser({ username: '' });
    };

    let clickHandler = {};
    switch(text) {
        case 'Sign out':
            clickHandler.onClick = () => handleClick();
            break;
        case 'Settings':
            clickHandler.onClick = () => {
                setIsSettings(true);
                setIsShown(() => false);
            };
    };
    const isNotSignOutOrSettings = text !== 'Sign out' && text !== 'Settings';

    return(
            <div className='relative group h-fit'>
                <button {...clickHandler} className='flex w-full py-5 px-10 items-center justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer'>
                    {text}
                </button>
                {isNotSignOutOrSettings && <ProfileDropDownSidePopOut 
                                            fetchRequests={fetchRequests}
                                            requests={requests}
                                            text={text}
                                            skills={skills}
                                        />}
            </div>
    );
};

export default ProfileDropDownOption;