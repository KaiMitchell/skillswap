import Option from "./Option";

function    DropDown({ 
    fetchMatches,
    matches,
    fetchRequests, 
    requests, 
    setUser, 
    isShown, 
    setIsShown, 
    setIsSettings,
    displayProfile,
    isNavDropDown,
    setIsNavDropdown,
}) {  
    return(
        <div className={`${isShown ? 'sm:block' : 'sm:hidden'} absolute h-screen top-0 w-full text-xl bg-white border-t shadow-black sm:top-full sm:right-0 sm:shadow-xl sm:w-max sm:h-fit`}>
            <Option 
                setIsShown={setIsShown}
                setIsNavDropdown={setIsNavDropdown}
                isNavDropDown={isNavDropDown}     
                text="Settings" 
                setIsSettings={setIsSettings} 
            />
            <Option 
                setIsShown={setIsShown}
                setIsNavDropdown={setIsNavDropdown}
                isNavDropDown={isNavDropDown} 
                text="Sent Requests" 
                fetchData={fetchRequests}
                displayProfile={displayProfile} 
                data={requests} 
            />
            <Option 
                setIsShown={setIsShown}
                setIsNavDropdown={setIsNavDropdown}
                isNavDropDown={isNavDropDown} 
                text="Match Requests" 
                fetchData={fetchRequests}
                displayProfile={displayProfile} 
                data={requests} 
            />
            <Option 
                setIsShown={setIsShown}
                setIsNavDropdown={setIsNavDropdown}
                isNavDropDown={isNavDropDown} 
                text="Matches" 
                fetchData={fetchMatches} 
                data={matches} 
                displayProfile={displayProfile}
            />
            <Option 
                setIsShown={setIsShown}
                setIsNavDropdown={setIsNavDropdown}
                isNavDropDown={isNavDropDown} 
                text="Sign out" 
                setUser={setUser} 
            />
        </div>
    );
};

export default DropDown;