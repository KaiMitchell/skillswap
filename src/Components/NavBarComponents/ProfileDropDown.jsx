import ProfileDropDownOption from "./ProfileDropDownOption";

function ProfileDropDown({ sentRequests, setUser, isShown, setIsShown, setIsSettings }) {
    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute top-full right-0 w-max h-fit py-5 bg-stone-950 text-xl shadow-xl shadow-black`}>
            <ProfileDropDownOption setIsShown={setIsShown} text="Settings" setIsSettings={setIsSettings} />
            <ProfileDropDownOption setIsShown={setIsShown} text="Requests" sentRequests={sentRequests} />
            <ProfileDropDownOption setIsShown={setIsShown} text="Add skills to teach" />
            <ProfileDropDownOption setIsShown={setIsShown} text="Add skills to learn" />
            <ProfileDropDownOption setIsShown={setIsShown} text="Sign out" setUser={setUser} />
        </div>
    );
};

export default ProfileDropDown;