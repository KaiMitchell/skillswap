import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

function MainSkillDropDown({ 
    type, 
    filterTitle,
    filter, 
    setFilter,
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
                setFilter={setFilter}
                filterTitle={filterTitle} 
                isSkillsDropDown={isSkillsDropDown} 
            />
        </div>
    );
};

export default MainSkillDropDown