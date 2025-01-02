import NavOptions from './NavOptions';

function NavBar({ fetchSentRequests, requests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
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
            fetchSentRequests={fetchSentRequests}
        />
    );
};

export default NavBar;