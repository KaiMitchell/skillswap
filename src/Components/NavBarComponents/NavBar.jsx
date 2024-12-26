import NavOptions from './NavOptions';

function NavBar({ username, setUser, setFilter, setIsSettings, fetchProfiles }) {

    return(
        <NavOptions username={username} fetchProfiles={fetchProfiles} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
    );
};

export default NavBar;