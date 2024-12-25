import NavOptions from './NavOptions';

function NavBar({ username, setUser, setFilter, setIsSettings }) {

    return(
        <nav className='relative w-full flex justify-between px-2.5 shadow-xl'>
            <NavOptions username={username} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
        </nav>
    );
};

export default NavBar;