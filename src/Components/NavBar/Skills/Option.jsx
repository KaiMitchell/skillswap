function Option({ skill, handleClick,  }) {
    return(
        <p key={skill} onClick={() => handleClick(skill)} className='p-5 text-stone-500 hover:text-stone-400 hover:bg-stone-700 text-xs sm:text-nowrap hover:cursor-pointer'>
            {skill}
        </p>
    );
};

export default Option;