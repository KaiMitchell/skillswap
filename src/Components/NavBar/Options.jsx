import { useState } from "react";
import DropDownContainer from "./SkillFilters/DropDownContainer";
import MobileOptions from "./MobileOptions";
import Selection from "./Selection";
import Categories from "./SkillFilters/Categories";
import SignInSignUp from "./SignInSignUp";
import MapData from "../../features/methods/MapData";

function Options({ 
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
    fetchProfiles,
    displayProfile,
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
                <MapData 
                    data={skills}
                    render={(obj, index) => (
                        <Selection 
                            setWhichFilter={setWhichFilter} 
                            key={obj.category} 
                            category={obj.category} 
                            text={obj.category} 
                            canHover={true} 
                            isLink={false} 
                            setFilter={setFilter} 
                            showRight={index > 1 ? true : false} 
                            obj={obj}
                        />
                    )}
                />
                <SignInSignUp username={username} />
                {username && <DropDownContainer 
                    setUser={setUser} 
                    username={username} 
                    setIsSettings={setIsSettings} 
                    requests={requests}
                    fetchRequests={fetchRequests}
                    fetchMatches={fetchMatches}
                    matches={matches}
                    skills={skills}
                    displayProfile={displayProfile}
                />}
            </div>
        </nav>
    );
};

export default Options;