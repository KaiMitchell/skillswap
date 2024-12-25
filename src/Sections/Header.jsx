import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderButton from '.././Components/HeaderButton';
import BurgerIcon from '.././Components/BurgerIcon';
import ProfileDropDown from '../Components/ProfileDropDown';

function Header({ username, setUser, setFilter, setIsSettings }) {
    const [isNavDropDown, setIsNavDropDown] = useState(false);
    const [isShown, setIsShown] = useState(false);

    return(
        <header className='h-full pt-10 md:pt-5 border-b'>
            <div className='fixed top-0 z-20 w-full bg-stone-900'>
                <nav className='relative w-full flex justify-between px-2.5 text-white shadow-xl'>
                    <Link to='/' className='sm:full py-2.5'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                        </svg>
                    </Link>
                    <BurgerIcon isNavDropDown={isNavDropDown} setIsNavDropDown={setIsNavDropDown} />
                    <div id="nav-dropdown-container" className={`${isNavDropDown ? 'block' : 'hidden'} absolute sm:contents sm:w-full right-2.5 top-full flex flex-col sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-5 sm:p-0`}>
                        <HeaderButton category={"CreativeArts"} text="Creative Arts" canHover={true} isLink={false} setFilter={setFilter} />
                        <HeaderButton category={"Music"} text="Music" canHover={true} isLink={false} setFilter={setFilter} />
                        <HeaderButton category={"LanguageLearning"} text="Language Learning" canHover={true} isLink={false} setFilter={setFilter} />
                        <HeaderButton category={"FitnessAndWellness"} text="Fitness and Wellness" canHover={true} isLink={false} setFilter={setFilter} />
                        <HeaderButton category={"TechnologyAndCoding"} text="Technology and Coding" showRight={true} canHover={true} setFilter={setFilter} isLink={false} />
                        <HeaderButton category={"ProfessionalDevelopment"} text="Professional Development" showRight={true} canHover={true} isLink={false} setFilter={setFilter} />
                        {username === '' && <HeaderButton text="Register" path="/register" isLink={true}  />}
                        {username === '' && <HeaderButton text="Sign in" path="/sign-in" isLink={true}  />}
                        <div className={`${username !== '' ? 'block' : 'hidden'} flex flex-col items-center justify-center p-5 hover:bg-stone-700`} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
                            <p className='text-white m-1 self-center hover:bg-stone-700'>{username?.slice(0, 1).toUpperCase()}</p>
                            <ProfileDropDown setUser={setUser} username={username} isShown={isShown} setIsSettings={setIsSettings} />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;