import { useState } from 'react';
import DropDown from '../Settings/DropDown';

function DropDownContainer({ 
    matches,
    fetchMatches,
    skills, 
    fetchRequests, 
    requests, 
    username, 
    setUser, 
    setIsSettings,
    displayProfile,
}) {
    const [isShown, setIsShown] = useState();
    return(
        <div className={`${username ? 'block' : 'hidden'} sticky right-0 z-20 flex flex-col items-center justify-center py-2.5 px-5 bg-stone-950 shadow-[-7px_0px_10px_0px_black;] hover:bg-stone-700`} 
             onMouseEnter={() => setIsShown(true)} 
             onMouseLeave={() => setIsShown(false)}
        >
            {/* display capitalized first letter of username on profile drop down button */}
            <p className='text-white self-center hover:bg-stone-700'>
                {typeof username === 'string' ? username.slice(0, 1).toUpperCase() : ''}
            </p>
            <DropDown 
                fetchMatches={fetchMatches}
                matches={matches}
                fetchRequests={fetchRequests}
                requests={requests}
                setUser={setUser} 
                username={username} 
                isShown={isShown} 
                setIsShown={setIsShown} 
                setIsSettings={setIsSettings} 
                skills={skills}
                displayProfile={displayProfile}
            />
        </div>
    );
};

export default DropDownContainer;