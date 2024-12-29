import MainSkillDropDown from "./MainSkillDropDown";


function MainSkillsDropDownContainer({
    filter, 
    setWhichFilter,
    skills,
    isToTeachSkillsDropDown,
    isToLearnSkillsDropDown,
}) {
    return(
        <div className='flex gap-2.5'>
            <MainSkillDropDown 
                type={'to Learn'} 
                isSkillsDropDown={isToLearnSkillsDropDown}
                filter={filter}
                setWhichFilter={setWhichFilter}
                skills={skills}
                filterValueKey={'toLearn'}
            />
            <MainSkillDropDown 
                type={'to Teach'} 
                isSkillsDropDown={isToTeachSkillsDropDown}
                filter={filter}
                setWhichFilter={setWhichFilter}
                skills={skills}
                filterValueKey={'toTeach'}
            />
        </div>
    );
};

export default MainSkillsDropDownContainer;