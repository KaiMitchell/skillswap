import Option from "./Option";

function DropDown({ 
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
}) {  
    return(
        <>
            <div className={`${isShown ? 'sm:block' : 'sm:hidden'} h-screen text-xl sm:shadow-xl shadow-black sm:absolute sm:top-full sm:right-0 sm:w-max sm:h-fit sm:py-5 sm:bg-stone-950`}>
                <Option 
                    setIsShown={setIsShown}
                    isNavDropDown={isNavDropDown}     
                    text="Settings" 
                    setIsSettings={setIsSettings} 
                />
                <Option 
                    setIsShown={setIsShown}
                    isNavDropDown={isNavDropDown} 
                    text="Sent Requests" 
                    fetchData={fetchRequests}
                    displayProfile={displayProfile} 
                    data={requests} 
                />
                <Option 
                    setIsShown={setIsShown}
                    isNavDropDown={isNavDropDown} 
                    text="Match Requests" 
                    fetchData={fetchRequests}
                    displayProfile={displayProfile} 
                    data={requests} 
                />
                <Option 
                    setIsShown={setIsShown}
                    isNavDropDown={isNavDropDown} 
                    text="Matches" 
                    fetchData={fetchMatches} 
                    data={matches} 
                    displayProfile={displayProfile}
                />
                <Option 
                    setIsShown={setIsShown}
                    isNavDropDown={isNavDropDown} 
                    text="Sign out" 
                    setUser={setUser} 
                />
            </div>
        </>
    );
};

export default DropDown;