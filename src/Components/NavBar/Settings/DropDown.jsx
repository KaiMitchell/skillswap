import Option from "./Option";

function DropDown({ 
    fetchMatches,
    matches,
    fetchRequests, 
    requests, 
    setUser, 
    isShown, 
    setIsShown, 
    setIsSettings 
}) {  
    return(
        <>
            {isShown && (
                <div className={`absolute top-full right-0 w-max h-fit py-5 bg-stone-950 text-xl shadow-xl shadow-black`}>
                    <Option setIsShown={setIsShown} text="Settings" setIsSettings={setIsSettings} />
                    <Option setIsShown={setIsShown} text="Sent Requests" fetchData={fetchRequests} data={requests} />
                    <Option setIsShown={setIsShown} text="Match Requests" fetchData={fetchRequests} data={requests} />
                    <Option setIsShown={setIsShown} text="Matches" fetchData={fetchMatches} data={matches} />
                    <Option setIsShown={setIsShown} text="Sign out" setUser={setUser} />
                </div>
            )}
        </>
    );
};

export default DropDown;