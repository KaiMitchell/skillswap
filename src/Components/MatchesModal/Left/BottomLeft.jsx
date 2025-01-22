import Button from "../../../commonComponents/Button";

function BottomLeft({ 
    displayedProfile, 
    unMatch,
    isMatched
}) {
    //arguments the functions parameters that un matches a user
    const param = displayedProfile?.email;
    const selectedUser = displayedProfile?.username;

    return(
        <div className='flex flex-col gap-1.5 items-center sm:items-start sm:gap-0'>
            <p>member since: {displayedProfile?.created_at}</p>
            {isMatched && displayedProfile?.phone_number && 
                <p></p>
            }
            {isMatched && displayedProfile?.email && 
                <p>{displayedProfile?.email}</p>
            }
            <div className='text-center sm:hidden'>
                <h3 className='text-xl font-bold underline'>About</h3>
                <p>
                    {displayedProfile?.description || 'No Description'}
                </p>
            </div>
            {isMatched && 
                <Button 
                    handleOnClick={() => unMatch(param, selectedUser)}
                    styles={`h-10 w-28 sm:h-8 sm:w-20 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer`}
                    text={'Unmatch'}
                />
            }
        </div>
    );
};

export default BottomLeft;