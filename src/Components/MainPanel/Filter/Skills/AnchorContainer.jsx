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
        <div className='hidden mt-2.5 w-full sm:block sm:flex sm:gap-2.5'>
            <MainSkillDropDown 
                dropDownTitle={`${filter?.toLearnCategory}`}
                isSkillsDropDown={isToLearnSkillsDropDown}
                filter={filter}
                setWhichFilter={setWhichFilter}
                skills={skills}
                setFilter={setFilter}
                filterValueKey={'toLearn'}
            />
            <MainSkillDropDown 
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