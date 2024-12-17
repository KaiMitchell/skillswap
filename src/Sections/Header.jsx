import react, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderButton from '.././Components/HeaderButton';
import BurgerIcon from '.././Components/BurgerIcon';
import SearchInputButton from '../Components/SearchInputButton';

function Header() {
    const [isNavDropDown, setIsNavDropDown] = useState(false);

    const isShown = isNavDropDown ? 'block' : 'hidden';

    return(
        <header className='h-full pt-10 md:pt-5 border-b shadow-xl'>
            <div className='fixed top-0 z-20 w-full bg-stone-900 '>
                <nav className='relative flex justify-between p-2.5 text-white'>
                    <Link to='/' className='sm:full'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                        </svg>
                    </Link>
                    <BurgerIcon isNavDropDown={isNavDropDown} setIsNavDropDown={setIsNavDropDown} />
                    <div id="nav-dropdown-container" className={`${isShown} absolute sm:contents sm:w-full right-2.5 top-full flex flex-col sm:flex-row sm:justify-between items-center bg-black sm:bg-transparent text-white sm:text-black p-5 sm:p-0`}>
                        <HeaderButton text="Online" isLink={false} />
                        <HeaderButton text="In person" isLink={false} />
                        <HeaderButton text="Sign in" path="/sign-in" isLink={true} />
                        <HeaderButton text="Register" path="/sign-up" isLink={true} />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;