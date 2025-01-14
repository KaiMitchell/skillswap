import DropDownAnchor from "../DropDownAnchor";

function SkillsDropDownAnchor({ 
    type, 
    dropDownTitle,
    filter, 
    setFilter,
    setWhichFilter,
    skills,
    filterValueKey,
    isMobile,
    isSkillsDropDown
}) {

    let isOpacity;

    if(isMobile) {
        isOpacity = false;
    } else if(isSkillsDropDown) {
        isOpacity = false;
    };

    const mobileStyles = '';

    return(
        <div className={`${isSkillsDropDown || isMobile ? 'opacity-100' : 'opacity-0'} sm:block`}>
            <h2 className='text-center'>{!isMobile && type}</h2>
            <DropDownAnchor 
                setWhichFilter={setWhichFilter} 
                filter={filter} 
                skills={skills} 
                filterValueKey={filterValueKey} 
                setFilter={setFilter}
                dropDownTitle={dropDownTitle} 
                isSkillsDropDown={isSkillsDropDown} 
            />
        </div>
    );
};

export default SkillsDropDownAnchor