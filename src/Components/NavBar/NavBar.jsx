import Options from './Options';

function NavBar({ fetchMatches, matches, fetchRequests, requests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    return(
        <Options 
            fetchMatches={fetchMatches}
            matches={matches}
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