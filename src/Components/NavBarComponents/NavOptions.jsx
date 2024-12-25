import { useState } from "react";
import HeaderButton from './HeaderButton';
import ProfileDropDown from "./ProfileDropDown";

function NavOptions({ isNavDropDown, username, setUser, setFilter, setIsSettings }) {
    const [isShown, setIsShown] = useState(false);
    const categories = [
        "CreativeArts",
        "Music",
        "LanguageLearning",
        "FitnessAndWellness",
        "TechnologyAndCoding",
        "ProfessionalDevelopment"
    ];

    return(
        <div className={`${isNavDropDown ? 'block' : 'hidden'} absolute sm:contents sm:w-full right-2.5 top-full flex flex-col sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-5 sm:p-0`}>
            {categories.map((category, index) => <HeaderButton key={category} category={category} text={category} canHover={true} isLink={false} setFilter={setFilter} showRight={index > categories.length - 3 ? true : false} />)}
            {username === '' && <HeaderButton text="Register" path="/register" isLink={true}  />}
            {username === '' && <HeaderButton text="Sign in" path="/sign-in" isLink={true}  />}
            <div className={`${username !== '' ? 'block' : 'hidden'} flex flex-col items-center justify-center p-5 hover:bg-stone-700`} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                <p className='text-white m-1 self-center hover:bg-stone-700'>{username?.slice(0, 1).toUpperCase()}</p>
                <ProfileDropDown setUser={setUser} username={username} isShown={isShown} setIsSettings={setIsSettings} />
            </div>
        </div>
    );
};

export default NavOptions;