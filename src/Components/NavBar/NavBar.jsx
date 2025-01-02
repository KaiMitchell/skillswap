import Options from './Options';

function NavBar({ fetchRequests, requests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    return(
        <Options 
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