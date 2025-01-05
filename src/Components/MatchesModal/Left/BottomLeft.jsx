function BottomLeft({ displayedMatch }) {
    return(
        <>
            <p className='my-5'>member since: {displayedMatch?.created_at}</p>
            {displayedMatch?.phone_number && <p className='my-5'>Phone number: ...</p>}
            {displayedMatch?.email && <p className='my-5'>Email: {displayedMatch?.email}</p>}
        </>
    );
};

export default BottomLeft;