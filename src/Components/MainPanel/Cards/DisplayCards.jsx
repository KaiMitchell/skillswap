function DisplayCards({
    filterInfo,
    searchingByStr,
    mappedProfiles
}) {
    return(        
        <div className='w-full h-full flex flex-col gap-2.5 pt-5'>
            <h2 className='text-center text-white text-2xl font-bold'>{searchingByStr}</h2>
            <h3 className='text-center text-white'>{`${filterInfo}`}</h3>
            {mappedProfiles}
        </div>
    );
};

export default DisplayCards;