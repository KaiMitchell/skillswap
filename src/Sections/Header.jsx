import NavBar from "../Components/NavBar/NavBar";

function Header({ 
    fetchRequests, 
    matches,
    fetchMatches,
    requests, 
    setWhichFilter, 
    skills, 
    username, 
    setUser, 
    setFilter, 
    setIsSettings, 
    fetchProfiles,
    displayProfile,
}) {
    return(
        <header className='h-fit pt-10 border-b'>
            <div className='fixed top-0 z-20 w-full bg-stone-900'>
                <NavBar 
                    matches={matches}
                    fetchMatches={fetchMatches}
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
                />
            </div>
        </header>
    );
}

export default Header;