import NavBar from "../Components/NavBarComponents/NavBar";

function Header({ username, setUser, setFilter, setIsSettings }) {

    return(
        <header className='h-full pt-10 border-b'>
            <div className='fixed top-0 z-20 w-full bg-stone-900'>
                <NavBar username={username} setUser={setUser} setFilter={setFilter} setIsSettings={setIsSettings} />
            </div>
        </header>
    );
}

export default Header;