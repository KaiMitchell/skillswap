import MainSkillDropDown from "./SkillsDropDownAnchor";


function AnchorContainer({
    filter, 
    setWhichFilter,
    skills,
    isToTeachSkillsDropDown,
    isToLearnSkillsDropDown,
    setFilter,
}) {
    return(
        <div className='flex gap-2.5'>
            <MainSkillDropDown 
                type={'to Learn'} 
                dropDownTitle={`${filter?.toLearnCategory}`}
                isSkillsDropDown={isToLearnSkillsDropDown}
                filter={filter}
                setWhichFilter={setWhichFilter}
                skills={skills}
                setFilter={setFilter}
                filterValueKey={'toLearn'}
            />
            <MainSkillDropDown 
                type={'to Teach'} 
                dropDownTitle={`${filter?.toTeachCategory}`}
                isSkillsDropDown={isToTeachSkillsDropDown}
                filter={filter}
                setFilter={setFilter}
                setWhichFilter={setWhichFilter}
                skills={skills}
                filterValueKey={'toTeach'}
            />
        </div>
    );
};

export default AnchorContainer;