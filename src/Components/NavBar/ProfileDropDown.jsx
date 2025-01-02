import ProfileDropDownOption from "./ProfileDropDownOption";

function ProfileDropDown({ skills, fetchRequests, requests, setUser, isShown, setIsShown, setIsSettings }) {  
    return(
        <>
            {isShown && (
                <div className={`absolute top-full right-0 w-max h-fit py-5 bg-stone-950 text-xl shadow-xl shadow-black`}>
                    <ProfileDropDownOption setIsShown={setIsShown} text="Settings" setIsSettings={setIsSettings} />
                    <ProfileDropDownOption setIsShown={setIsShown} text="Sent Requests" fetchRequests={fetchRequests} requests={requests} />
                    <ProfileDropDownOption setIsShown={setIsShown} text="Match Requests" fetchRequests={fetchRequests} requests={requests} />
                    <ProfileDropDownOption setIsShown={setIsShown} text="Matches" />
                    <ProfileDropDownOption setIsShown={setIsShown} text="Sign out" setUser={setUser} />
                </div>
            )}
        </>
    );
};

export default ProfileDropDown;