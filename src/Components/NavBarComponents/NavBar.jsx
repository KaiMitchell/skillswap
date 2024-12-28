import NavOptions from './NavOptions';

function NavBar({ skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {

    return(
        <NavOptions skills={skills} username={username} fetchProfiles={fetchProfiles} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
    );
};

export default NavBar;