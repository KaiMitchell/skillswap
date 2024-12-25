import { useState } from "react";
import HeaderButton from './HeaderButton';
import ProfileDropDownContainer from "./ProfileDropDownContainer";
import MobileOptions from "./MobileOptions";

function NavOptions({ username, setUser, setFilter, setIsSettings }) {
    const [isNavDropDown, setIsNavDropDown] = useState(false);

    const categories = [
        "CreativeArts",
        "Music",
        "LanguageLearning",
        "FitnessAndWellness",
        "TechnologyAndCoding",
        "ProfessionalDevelopment"
    ];

    return(
        <nav className='relative w-full flex justify-between sm:px-2.5 shadow-xl'>
            <MobileOptions isNavDropDown={isNavDropDown} setIsNavDropDown={setIsNavDropDown} />
            <div className={`${isNavDropDown ? 'block' : 'hidden'} absolute sm:contents w-full sm:w-full sm:right-2.5 top-full flex flex-col gap-5 sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-5 sm:p-0`}>
                {categories.map((category, index) => <HeaderButton key={category} category={category} text={category} canHover={true} isLink={false} setFilter={setFilter} showRight={index > categories.length - 3 ? true : false} />)}
                {username === '' && <HeaderButton text="Register" path="/register" isLink={true}  />}
                {username === '' && <HeaderButton text="Sign in" path="/sign-in" isLink={true}  />}
                <ProfileDropDownContainer setUser={setUser} username={username} setIsSettings={setIsSettings} />
            </div>
        </nav>
    );
};

export default NavOptions;