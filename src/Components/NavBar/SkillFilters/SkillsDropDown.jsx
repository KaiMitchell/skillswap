import Option from './Option.jsx';

function SkillsDropDown({ 
    setWhichFilter, 
    obj, 
    isShown, 
    setIsShown,
    category,
    showRight, 
    setFilter 
}) {
    //fetch all users associated with the selected skill.
    async function handleClick(skill) {
        setFilter({
            category: category,
            skill: skill
        });
        setWhichFilter({ mainFilter: false, headerFilter: true });
        setIsShown(false);
    };
    
    return(
        <div 
            id='dropDown' 
            className={`${isShown ? 'block' : 'hidden'} absolute top-full ${showRight ? 'sm:right-0' : 'sm:left-0'} w-full w-max h-72 py-5 grid grid-cols-2 sm:gap-x-5 bg-stone-950 sm:px-50 shadow-xl overflow-y-auto no-scrollbar`}
        >
            {obj?.skills.map((skill) => {
                return(
                    <Option key={skill} skill={skill} handleClick={handleClick} />
                );
            })};
        </div>
    );
};

export default SkillsDropDown;