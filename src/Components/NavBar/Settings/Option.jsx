import { useEffect, useState } from "react";
import PopOut from "./PopOut.jsx";

function Option({ 
    skills, 
    fetchData,
    data, 
    setUser, 
    text, 
    setIsSettings, 
    setIsShown,
    displayProfile
}) { 
    let clickHandler = {};
    //fetch data effect for individual pop outs due to re-rendering.
    useEffect(() => {
        text === 'Requests' && fetchData();
    }, []); 

    function handleClick() {
        localStorage.removeItem('user');
        setUser();
    };

    switch(text) {
        case 'Sign out':
            clickHandler.onClick = () => handleClick();
            break;
        case 'Settings':
            clickHandler.onClick = () => {
                setIsSettings(true);
                setIsShown(() => false);
            };
            break;
    };
    const isNotSignOutOrSettings = text !== 'Sign out' && text !== 'Settings';

    return(
            <div className='relative group h-fit'>
                <button {...clickHandler} className='flex w-full py-5 px-10 items-center justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer'>
                    {text}
                </button>
                {isNotSignOutOrSettings && 
                    <PopOut 
                        fetchData={fetchData}
                        data={data}
                        text={text}
                        skills={skills}
                        displayProfile={displayProfile}
                    />
                }
            </div>
    );
};

export default Option;