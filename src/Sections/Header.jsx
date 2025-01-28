import { useEffect, useState } from "react";
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
    isLandingPage,
}) {
    const [isNavDropdown, setIsNavDropdown] = useState(false);

    return(
            <div className={`${username || !isLandingPage ? 'bg-stone-950' : 'bg-opacity-0'} fixed top-0 z-20 w-full border-b`}>
                <nav className='w-full flex justify-between shadow-xl'>
                    {/* Burger and home icon */}
                    <MobileOptions 
                        username={username} 
                        fetchProfiles={fetchProfiles} 
                        isNavDropdown={isNavDropdown} 
                        setIsNavDropdown={setIsNavDropdown}
                        isHideHeader={isHideHeader}
                    />
                    <div className={`${isNavDropdown ? 'block' : 'hidden'} ${username || !isLandingPage && 'bg-black'} absolute right-0 top-full w-full flex flex-col items-start text-white overflow-y-scroll no-scrollbar sm:contents sm:items-center sm:flex-row sm:justify-between sm:bg-transparent sm:text-black`}>
                        {/* Render all categories in nav bar with skill options as a drop down */}
                        {!isNavDropdown && username &&
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