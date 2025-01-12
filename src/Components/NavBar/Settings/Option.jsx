import { useEffect, useState } from "react";
import PopOut from "./PopOut.jsx";
import Button from "../../../commonComponents/Button.jsx";

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
    let clickHandler = () => {};
    
    //fetch data effect for individual pop outs due to re-rendering.
    useEffect(() => {
        text === 'Requests' && fetchData();
    }, []); 

    async function signOut() {
        await fetch(`http://localhost:4000/signout`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            // credentials: 'include'
        });
        localStorage.removeItem('user');
        sessionStorage.removeItem('access token');
        setUser();
    };

    //dynamically apply a handler to certain button
    switch(text) {
        case 'Sign out':
            clickHandler = signOut;
            break;
        case 'Settings':
            clickHandler = () => {
                setIsSettings(true);
                setIsShown(() => false);
            };
            break;
    };

    //only apply the pop out feature on elements that are not for signing out or opening settings
    const isNotSignOutOrSettings = text !== 'Sign out' && text !== 'Settings';

    return(
            <div className='relative group h-fit'>
                <Button 
                    handleOnClick={clickHandler} 
                    styles={`flex w-full py-5 px-10 items-center justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer`}
                    text={text}
                />
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