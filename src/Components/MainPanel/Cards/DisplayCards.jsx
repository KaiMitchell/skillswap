function DisplayCards({
    filterInfo,
    searchingByStr,
    mappedProfiles
}) {
    return(        
        <div className='w-1/2 flex flex-col gap-5 pt-5'>
            <h2 className='text-center text-2xl font-bold'>{searchingByStr}</h2>
            <h3 className='text-center'>{`${filterInfo}`}</h3>
            {mappedProfiles}
        </div>
    );
};

export default DisplayCards;