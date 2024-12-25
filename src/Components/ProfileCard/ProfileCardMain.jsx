

function ProfileCardMain({ name, skill }) {
    return(
        <div className='relative bg-stone-700 bg-contain h-64 w-full bg-center'>
            <h3 className="absolute top-0 right-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{name}</h3>
            <h3 className="absolute bottom-10 left-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{skill}</h3>
        </div>
    );
};

export default ProfileCardMain;