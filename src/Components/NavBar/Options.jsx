import { useState } from "react";
import DropDownContainer from "./SkillFilters/DropDownContainer";
import MobileOptions from "./MobileOptions";
import Categories from "./SkillFilters/Categories";
import SignInSignUp from "./SignInSignUp";

function Options({ 
    setIsDisplayMatch,
    matches, 
    fetchMatches, 
    fetchRequests, 
    requests, 
    setWhichFilter, 
    skills, 
    username, 
    setUser, 
    setFilter, 
    setIsSettings, 
    fetchProfiles 
}) {
    const [isNavDropDown, setIsNavDropDown] = useState(false);
    return(
        <nav className='relative w-full flex justify-between shadow-xl'>
            <MobileOptions 
                username={username} 
                fetchProfiles={fetchProfiles} 
                isNavDropDown={isNavDropDown} 
                setIsNavDropDown={setIsNavDropDown}
            />
            <div className={`${isNavDropDown ? 'block' : 'hidden'} absolute sm:contents w-full sm:right-2.5 top-full flex flex-col gap-5 sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-0`}>
                {/* Render all categories in nav bar with skill options as a drop down */}
                <Categories 
                    skills={skills}
                    setWhichFilter={setWhichFilter}
                    setFilter={setFilter}
                />
                <SignInSignUp username={username} />
                <DropDownContainer 
                    setUser={setUser} 
                    username={username} 
                    setIsSettings={setIsSettings} 
                    setIsDisplayMatch={setIsDisplayMatch}
                    requests={requests}
                    fetchRequests={fetchRequests}
                    fetchMatches={fetchMatches}
                    matches={matches}
                    skills={skills}
                />
            </div>
        </nav>
    );
};

export default Options;