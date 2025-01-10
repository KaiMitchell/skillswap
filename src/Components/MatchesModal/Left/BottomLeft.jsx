function BottomLeft({ displayedMatch, unMatch }) {
    //arguments for un match functions parameters
    const param = displayedMatch?.email;
    const selectedUser = displayedMatch?.username;
    console.log(selectedUser);
    return(
        <>
            <p className='my-5'>member since: {displayedMatch?.created_at}</p>
            {displayedMatch?.phone_number && <p className='my-5'>Phone number: ...</p>}
            {displayedMatch?.email && <p className='my-5'>Email: {displayedMatch?.email}</p>}
            <button 
                onClick={() => unMatch(param, selectedUser)}
                className='h-8 w-20 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer'
            >
                unMatch
            </button>
        </>
    );
};

export default BottomLeft;