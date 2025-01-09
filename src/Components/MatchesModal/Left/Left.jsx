function Left({ displayedMatch, img }) {
    return(
        <div className='flex h-max items-center gap-5'>
            <img 
                src={`${img}`}
                className='min-w-40 min-h-40 bg-black rounded-full self-start flex justify-center items-center text-white' 
            />
            <div>
                <p className="text-xl text-stone-900 font-bold">{displayedMatch?.username}</p>
                {displayedMatch?.phone_number && <p className="text-stone-500">City</p>}
            </div>
        </div>
    );
};

export default Left;