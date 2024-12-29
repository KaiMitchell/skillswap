import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

function MainSkillDropDown({ 
    type, 
    filter, 
    setWhichFilter,
    skills,
    filterValueKey,
    isSkillsDropDown
}) {
    return(
        <div className={`${isSkillsDropDown ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className='text-center'>{type}</h2>
            <MainFilterDropDownComponent 
                setWhichFilter={setWhichFilter} 
                filter={filter} skills={skills} 
                filterValueKey={filterValueKey} 
                filterTitle={`${filter?.toTeachCategory}`} 
                isSkillsDropDown={isSkillsDropDown} 
            />
        </div>
    );
};

export default MainSkillDropDown