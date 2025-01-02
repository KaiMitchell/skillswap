import NavBar from "../Components/NavBar/NavBar";

function Header({ fetchRequests, requests, setWhichFilter, skills, username, setUser, setFilter, setIsSettings, fetchProfiles }) {
    return(
        <header className='h-full pt-10 border-b'>
            <div className='fixed top-0 z-20 w-full bg-stone-900'>
                <NavBar 
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
            </div>
        </header>
    );
}

export default Header;