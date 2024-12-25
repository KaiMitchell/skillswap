import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';

function ProfileDropDownContainer({ username, setUser,  setIsSettings }) {
    const [isShown, setIsShown] = useState();

    return(
        <div className={`${username !== '' ? 'block' : 'hidden'} flex flex-col items-center justify-center p-5 hover:bg-stone-700`} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <p className='text-white m-1 self-center hover:bg-stone-700'>{username?.slice(0, 1).toUpperCase()}</p>
            <ProfileDropDown setUser={setUser} username={username} isShown={isShown} setIsShown={setIsShown} setIsSettings={setIsSettings} />
        </div>
    );
};

export default ProfileDropDownContainer;