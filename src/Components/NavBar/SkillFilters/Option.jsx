function Option({ skill, handleClick,  }) {
    return(
        <p 
            key={skill} 
            onClick={() => handleClick(skill)} 
            className='p-5 hover:bg-zinc-100 text-xs sm:text-nowrap cursor-pointer'
        >
            {skill}
        </p>
    );
};

export default Option;