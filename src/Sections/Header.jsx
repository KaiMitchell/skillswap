import { useState } from "react";
import DropDownContainer from "../Components/NavBar/SkillFilters/DropDownContainer";
import MobileOptions from "../Components/NavBar/MobileOptions";
import Selection from "../Components/NavBar/Selection";
import SignInSignUp from "../Components/NavBar/SignInSignUp";
import MapData from "../features/methods/MapData";

function Header({ 
    fetchRequests, 
    matches,
    fetchMatches,
    requests, 
    setWhichFilter, 
    skills, 
    username, 
    setUser, 
    setFilter, 
    setIsSettings, 
    fetchProfiles,
    displayProfile,
    isHideHeader,
}) {
    const [isNavDropdown, setIsNavDropdown] = useState(false);

    return(
            <div className='sticky top-0 z-20 w-full bg-stone-950 p-2.5 border-b'>
                <nav className='w-full flex justify-between shadow-xl'>
                    {/* Burger and home icon */}
                    <MobileOptions 
                        username={username} 
                        fetchProfiles={fetchProfiles} 
                        isNavDropdown={isNavDropdown} 
                        setIsNavDropdown={setIsNavDropdown}
                        isHideHeader={isHideHeader}
                    />
                    <div className={`${isNavDropdown ? 'block' : 'hidden'} absolute right-0 sm:p-2.5 top-full w-full flex flex-col gap-5 items-start bg-black text-white overflow-y-scroll no-scrollbar sm:contents sm:items-center sm:flex-row sm:justify-between sm:p-0 sm:bg-transparent sm:text-black`}>
                        {/* Render all categories in nav bar with skill options as a drop down */}
                        {!isNavDropdown && 
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
                        }
                        <SignInSignUp setIsNavDropdown={setIsNavDropdown} username={username} />
                        {/* drop down for profile / settings button (top-right) */}
                        {username && 
                            <DropDownContainer 
                                setUser={setUser} 
                                username={username} 
                                setIsSettings={setIsSettings} 
                                requests={requests}
                                fetchRequests={fetchRequests}
                                fetchMatches={fetchMatches}
                                matches={matches}
                                skills={skills}
                                displayProfile={displayProfile}
                                isNavDropdown={isNavDropdown}
                                setIsNavDropdown={setIsNavDropdown}
                            />
                        }
                    </div>
                </nav>
            </div>
    );
}

export default Header;