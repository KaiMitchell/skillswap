import { useState } from 'react';
import ProfileDropDownSidePopOut from "./ProfileDropDownSidePopOut.jsx";

function ProfileDropDownOption({ setUser, text, setIsSettings, setIsShown }) {
    const [isPopOut, setIsPopOut] = useState(false);

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
                setIsShown(false);
            };
    };

    let hoverHandler = {};
    switch(true) {
        case text !== 'Sign out' && text !== 'Settings':
            hoverHandler.onMouseOver = () => {
                setIsPopOut(true);
                text === 'Requests' && fetchMatchRequests();
            };
            hoverHandler.onMouseLeave = () => setIsPopOut(false);
            break;
        case text === 'Requests':
            hoverHandler.onMouseOver = () => console.log('requests');
            break;
    };

    async function fetchMatchRequests() {
        const response = await fetch(`http://localhost:3000/fetch-requests?user=${localStorage.getItem('user')}`);
        const data = await response.json();
        console.log(data);
    };

    return(
            <div className='relative'>
                <button {...clickHandler} {...hoverHandler} className='flex w-full py-5 px-10 items-center justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer'>
                    {text}
                </button>
                <ProfileDropDownSidePopOut isPopOut={isPopOut} />
            </div>
    );
};

export default ProfileDropDownOption;