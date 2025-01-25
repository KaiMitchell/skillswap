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

    return(
        <div className={`${isSkillsDropDown ? 'opacity-100' : 'opacity-0'} ${isMobile && isSkillsDropDown ? 'block' : 'hidden'} w-full sm:w-1/2 sm:block`}>
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