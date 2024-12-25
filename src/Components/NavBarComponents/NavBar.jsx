import { useState } from 'react';
import { Link } from 'react-router-dom';
import BurgerIcon from './BurgerIcon';
import NavOptions from './NavOptions';

function NavBar({ username, setUser, setFilter, setIsSettings }) {
    const [isNavDropDown, setIsNavDropDown] = useState(false);

    return(
        <nav className='relative w-full flex justify-between px-2.5 text-white shadow-xl'>
            <Link to='/' className='sm:full py-2.5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
            </Link>
            <BurgerIcon isNavDropDown={isNavDropDown} setIsNavDropDown={setIsNavDropDown} />
            <NavOptions isNavDropDown={isNavDropDown} username={username} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
        </nav>
    );
};

export default NavBar;