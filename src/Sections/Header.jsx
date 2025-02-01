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
    currentPage,
    setCurrentPage,
}) {
    const [isNavDropdown, setIsNavDropdown] = useState(false);

    const isInitialSkillsPickPage = currentPage === 'initial skills pick';

    let bgColor = '';
    //declare bg color for header
    if(isInitialSkillsPickPage) {
        bgColor = 'bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400';
    } else {
        bgColor = '';
    };

    return(
            <div className={`${bgColor} fixed top-0 z-20 w-full backdrop-blur-lg`}>
                <nav className='w-full flex justify-between shadow-xl'>
                    {/* Burger and home icon */}
                    <MobileOptions 
                        username={username} 
                        fetchProfiles={fetchProfiles} 
                        isNavDropdown={isNavDropdown} 
                        setIsNavDropdown={setIsNavDropdown}
                        setCurrentPage={setCurrentPage}
                    />
                    <div className={`${isNavDropdown ? 'block' : 'hidden'} absolute right-0 top-full h-screen w-full flex flex-col items-start overflow-y-scroll no-scrollbar sm:contents sm:items-center sm:flex-row sm:justify-between sm:bg-transparent`}>
                        {/* Render all categories in nav bar with skill options as a drop down */}
                        {!isNavDropdown && username && !isInitialSkillsPickPage && 
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
                        {!username && <SignInSignUp setIsNavDropdown={setIsNavDropdown} username={username} />}
                        {/* drop down for profile / settings button (top-right) */}
                        {username && !isInitialSkillsPickPage &&
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