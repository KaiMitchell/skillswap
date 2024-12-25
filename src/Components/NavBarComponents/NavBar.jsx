import NavOptions from './NavOptions';

function NavBar({ username, setUser, setFilter, setIsSettings }) {

    return(
        <NavOptions username={username} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
    );
};

export default NavBar;