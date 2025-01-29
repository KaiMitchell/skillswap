function Left({ 
    displayedProfile, 
    img,
    isMatched
}) {
    return(
        <div className='flex flex-col h-max items-center'>
            <img 
                src={img}
                className='size-48 bg-black rounded-full flex justify-center items-center text-white sm:self-start' 
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
                <p>member since: {displayedProfile?.created_at}</p>
                {isMatched && displayedProfile?.phone_number && 
                    <p></p>
                }
                {isMatched && displayedProfile?.email && 
                    <p>{displayedProfile?.email}</p>
                }
                <div className='h-1/2 text-center sm:hidden'>
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
                <div className='hidden text-left w-full sm:block'>
                        <h3 className='text-xl font-bold underline'>About</h3>
                        <p>
                            {displayedProfile?.description || 'No Description'}
                        </p>
                </div>
            </div>
        </div>
    );
};

export default Left;