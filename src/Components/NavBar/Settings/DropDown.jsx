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
    displayProfile
}) {  
    return(
        <>
            <div className={`${isShown ? 'sm:block' : 'sm:hidden'} text-xl sm:shadow-xl shadow-black sm:absolute sm:top-full sm:right-0 sm:w-max sm:h-fit sm:py-5 sm:bg-stone-950`}>
                <Option 
                    setIsShown={setIsShown} 
                    text="Settings" 
                    setIsSettings={setIsSettings} 
                />
                <Option 
                    setIsShown={setIsShown} 
                    text="Sent Requests" 
                    fetchData={fetchRequests}
                    displayProfile={displayProfile} 
                    data={requests} 
                />
                <Option 
                    setIsShown={setIsShown} 
                    text="Match Requests" 
                    fetchData={fetchRequests}
                    displayProfile={displayProfile} 
                    data={requests} 
                />
                <Option 
                    setIsShown={setIsShown} 
                    text="Matches" 
                    fetchData={fetchMatches} 
                    data={matches} 
                    displayProfile={displayProfile}
                />
                <Option 
                    setIsShown={setIsShown} 
                    text="Sign out" 
                    setUser={setUser} 
                />
            </div>
        </>
    );
};

export default DropDown;