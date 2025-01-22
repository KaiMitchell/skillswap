function Left({ 
    displayedProfile, 
    img,
    isMatched
}) {
    return(
        <div className='flex flex-col h-max items-center gap-5 sm:flex-row'>
            <img 
                src={img}
                className='size-40 bg-black rounded-full flex justify-center items-center text-white sm:self-start' 
            />
            <div>
                <p className="text-xl text-stone-900 font-bold">{displayedProfile?.username}</p>
                {isMatched && displayedProfile?.phone_number && 
                    <p className="text-stone-500">
                        {displayedProfile?.phone_number}
                    </p>
                }
            </div>
        </div>
    );
};

export default Left;