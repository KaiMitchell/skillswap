const SelectedSkillsContainer = ({ mappedSkills, text }) => {
    return(
        <div className='h-1/4 w-full sm:h-1/2'>
            <h3 className={`text-xl font-bold`}>{text}</h3>
            <ul className={`p-2 h-full bg-black w-full text-white overflow-y-auto no-scrollbar sm:h-40 sm:rounded`}>
                {mappedSkills}
            </ul>
        </div>
    );
};

export default SelectedSkillsContainer;