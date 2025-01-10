function BottomLeft({ 
    displayedProfile, 
    unMatch,
    isMatched
}) {
    //arguments the functions parameters that un matches a user
    const param = displayedProfile?.email;
    const selectedUser = displayedProfile?.username;

    return(
        <>
            <p className='my-5'>member since: {displayedProfile?.created_at}</p>
            {isMatched && displayedProfile?.phone_number && 
                <p className='my-5'>Phone number: ...</p>
            }
            {isMatched && displayedProfile?.email && 
                <p className='my-5'>Email: {displayedProfile?.email}</p>
            }
            {isMatched && 
                <button 
                    onClick={() => unMatch(param, selectedUser)}
                    className='h-8 w-20 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer'
                >
                    unMatch
                </button>
            }
        </>
    );
};

export default BottomLeft;