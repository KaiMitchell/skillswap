import NavOptions from './NavOptions';

function NavBar({ fetchRequests, requests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    return(
        <NavOptions 
            requests={requests} 
            setWhichFilter={setWhichFilter} 
            skills={skills} 
            username={username} 
            fetchProfiles={fetchProfiles} 
            setUser={setUser} 
            setFilter={setFilter} 
            setIsSettings={setIsSettings} 
            fetchRequests={fetchRequests}
        />
    );
};

export default NavBar;