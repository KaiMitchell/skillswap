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
        <div className={`flex flex-col w-full py-2.5 sm:px-5 sm:bg-stone-950 shadow-[-7px_0px_10px_0px_black;] sm:sticky sm:right-0 sm:z-20 sm:items-center sm:justify-center sm:w-fit sm:hover:bg-stone-700`} 
             onMouseEnter={() => setIsShown(true)} 
             onMouseLeave={() => setIsShown(false)}
        >
            {/* display capitalized first letter of username on profile drop down button */}
            <p className='hidden text-white self-center hover:bg-stone-700 sm:block'>
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