import Options from './Options';

function NavBar({ 
    fetchMatches, 
    matches, 
    fetchRequests, 
    requests, 
    setWhichFilter, 
    skills, 
    username, 
    setUser, 
    setFilter, 
    setIsSettings, 
    fetchProfiles,
    displayProfile,
    accessToken,
}) {
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
            displayProfile={displayProfile}
            accessToken={accessToken}
        />
    );
};

export default NavBar;