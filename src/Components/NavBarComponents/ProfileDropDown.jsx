import ProfileDropDownOption from "./ProfileDropDownOption";

function ProfileDropDown({ setUser, isShown, setIsSettings }) {
    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute top-full right-2 w-max h-fit py-5 bg-stone-950 text-xl shadow-xl`}>
            <ProfileDropDownOption text="Settings" setIsSettings={setIsSettings} />
            <ProfileDropDownOption text="Add picture" />
            <ProfileDropDownOption text="Add skills to teach" />
            <ProfileDropDownOption text="Add skills to learn" />
            <ProfileDropDownOption text="Sign out" setUser={setUser} />
        </div>
    );
};

export default ProfileDropDown;