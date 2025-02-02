const SelectedSkillsContainer = ({ mappedSkills, text }) => {
    return(
        <div className='h-1/2 w-full'>
            <h3 className={`text-xl font-bold`}>{text}</h3>
            <ul className={`p-2 h-40 bg-black w-full text-white overflow-y-auto no-scrollbar sm:rounded`}>
                {mappedSkills}
            </ul>
        </div>
    );
};

export default SelectedSkillsContainer;