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
            hoverHandler.onMouseOver = () => setIsPopOut(true);
            hoverHandler.onMouseLeave = () => setIsPopOut(false);
            break;
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