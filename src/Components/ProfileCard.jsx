function ProfileCard({ img, skill, name }) {
    return(
        <article className='flex flex-col bg-black items-center my-10 shadow-xl bg-white'>
            {/* <div className='relative bg-contain h-64 w-full bg-center' style={{backgroundImage: `url(${img})`}}> */}
            <div className='relative bg-stone-700 bg-contain h-64 w-full bg-center'>
                <h3 className="absolute top-0 right-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{name}</h3>
                <h3 className="absolute bottom-10 left-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{skill}</h3>
            </div>
            <footer id="card-footer" className="flex justify-between w-1/2 mt-5">
                <p>city</p>
                <p>availability</p>
            </footer>
        </article>
    );
};

export default ProfileCard;