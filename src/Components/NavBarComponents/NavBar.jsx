import NavOptions from './NavOptions';

function NavBar({ sentRequests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    return(
        <NavOptions 
            sentRequests={sentRequests} 
            setWhichFilter={setWhichFilter} 
            skills={skills} 
            username={username} 
            fetchProfiles={fetchProfiles} 
            setUser={setUser} 
            setFilter={setFilter} 
            setIsSettings={setIsSettings} 
        />
    );
};

export default NavBar;