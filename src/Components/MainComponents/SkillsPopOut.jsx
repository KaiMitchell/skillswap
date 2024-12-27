function SkillsPopOut({ skills, isSkillsShown, setIsSkillsShown }) {

    return(
        <div className={`${isSkillsShown ? 'block' : 'hidden'} absolute w-full w-max h-fit left-full`}>
            {skills.map(skill => {
                return(
                    <p key={skill} onClick={() => handleClick} className='p-5 text-sm hover:bg-stone-700 hover:cursor-pointer'>{skill}</p>
                )
            })}
        </div>
    );
};

export default SkillsPopOut;