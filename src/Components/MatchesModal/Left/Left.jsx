function Left({ displayedMatch }) {
    return(
        <div className='flex h-max items-center gap-5'>
            <div className='min-w-40 min-h-40 bg-black rounded-full self-start flex justify-center items-center text-white'>
                Image
            </div>
            <div>
                <p className="text-xl text-stone-900 font-bold">{displayedMatch?.username}</p>
                {displayedMatch?.phone_number && <p className="text-stone-500">City</p>}
            </div>
        </div>
    );
};

export default Left;