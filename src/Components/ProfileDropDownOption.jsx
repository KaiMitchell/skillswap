

function ProfileDropDownOption({ setUser, text }) {

    function handleClick() {
        localStorage.removeItem('user');
        setUser({ username: '' });
    };

    return(
            <button {...(text === 'Sign out' && { onClick: () => handleClick() })} className='flex w-full py-5 px-10 items-center justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer'>
                {text}
            </button>
    );
};

export default ProfileDropDownOption;