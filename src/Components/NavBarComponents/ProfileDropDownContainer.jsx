import { useState } from 'react';
import ProfileDropDown from './ProfileDropDown';

function ProfileDropDownContainer({ skills, fetchSentRequests, sentRequests, username, setUser,  setIsSettings }) {
    const [isShown, setIsShown] = useState();

    return(
        <div className={`${username !== '' ? 'block' : 'hidden'} sticky right-0 z-20 flex flex-col items-center justify-center py-2.5 px-5 bg-stone-950 shadow-[-7px_0px_10px_0px_black;] hover:bg-stone-700`} 
             onMouseEnter={() => setIsShown(true)} 
             onMouseLeave={() => setIsShown(false)}
        >
            <p className='text-white self-center hover:bg-stone-700'>{username?.slice(0, 1).toUpperCase()}</p>
            <ProfileDropDown 
                fetchSentRequests={fetchSentRequests}
                sentRequests={sentRequests}
                setUser={setUser} 
                username={username} 
                isShown={isShown} 
                setIsShown={setIsShown} 
                setIsSettings={setIsSettings} 
                skills={skills}
            />
        </div>
    );
};

export default ProfileDropDownContainer;