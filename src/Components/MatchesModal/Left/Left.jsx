import Button from "../../../commonComponents/Button";

function Left({ 
    displayedProfile, 
    img,
    isMatched,
    unMatch,
}) {
    return(
        <div className='flex flex-col h-max items-center sm:justify-between sm:h-full sm:items-start'>
            <img 
                src={img}
                className='size-48 bg-black rounded-full flex justify-center items-center text-white sm:size-28 sm:self-start' 
            />
            <div>
                <p className="text-xl text-stone-900 font-bold">{displayedProfile?.username}</p>
                {isMatched && displayedProfile?.phone_number && 
                    <p className="text-stone-500">
                        {displayedProfile?.phone_number}
                    </p>
                }
            </div>
            <div className='flex flex-col justify-between items-center h-full sm:items-start sm:gap-0'>
                {isMatched && displayedProfile?.email && 
                    <p className={`font-medium`}>{displayedProfile?.email}</p>
                }
                <p>member since: {displayedProfile?.created_at}</p>
                {isMatched && displayedProfile?.phone_number && 
                    <p></p>
                }
                {isMatched && 
                    <Button 
                        handleOnClick={() => unMatch(displayedProfile?.username)}
                        styles={`h-10 w-28 sm:h-8 sm:w-20 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer`}
                        text={'Unmatch'}
                    />
                }
            </div>
        </div>
    );
};

export default Left;