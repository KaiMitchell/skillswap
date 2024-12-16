
function SearchInputButton({ type }) {
    return(
        <form className='flex text-3xl'>
            <input type={type} className='w-full p-2.5 border border-black border-r-0 focus:outline-none'/>
            <button className="px-5 border border-black border-l-0 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
    );
}

export default SearchInputButton;