
function BurgerIcon({ isNavDropDown, setIsNavDropDown }) {
    
    const rotate = isNavDropDown ? 'origin-center rotate-90' : '';

    return(
        <button onClick={() => setIsNavDropDown(!isNavDropDown)} className={`${rotate} sm:hidden text-white px-2.5 bg-stone-950`} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='size-7'>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
        </button>
    );
}

export default BurgerIcon;