import { useState } from "react";
import HeaderButton from './HeaderButton';
import ProfileDropDownContainer from "./ProfileDropDownContainer";
import MobileOptions from "./MobileOptions";

function NavOptions({ skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    const [isNavDropDown, setIsNavDropDown] = useState(false);
    return(
        <nav className='relative w-full flex justify-between shadow-xl'>
            <MobileOptions username={username} fetchProfiles={fetchProfiles} isNavDropDown={isNavDropDown} setIsNavDropDown={setIsNavDropDown} />
            <div className={`${isNavDropDown ? 'block' : 'hidden'} absolute sm:contents w-full sm:right-2.5 top-full flex flex-col gap-5 sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-0`}>
                {skills?.map((obj, index) => <HeaderButton key={obj.category} category={obj.category} text={obj.category} canHover={true} isLink={false} setFilter={setFilter} showRight={index > 1 ? true : false} obj={obj} />)}
                <div className='sticky right-0 flex bg-stone-950  shadow-[-7px_0px_10px_0px_black;]'>
                    {username === '' && <HeaderButton text="Register" path="/register" isLink={true}  />}
                    {username === '' && <HeaderButton text="Sign in" path="/sign-in" isLink={true}  />}
                </div>
                <ProfileDropDownContainer setUser={setUser} username={username} setIsSettings={setIsSettings} />
            </div>
        </nav>
    );
};

export default NavOptions;