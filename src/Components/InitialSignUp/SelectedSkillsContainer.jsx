const SelectedSkillsContainer = ({ mappedSkills, text }) => {
    return(
        <div className='min-h-1/2 w-full'>
            <h3 className={`text-xl font-bold`}>{text}</h3>
            <ul className={`p-2 h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar`}>
                {mappedSkills}
            </ul>
        </div>
    );
};

export default SelectedSkillsContainer;