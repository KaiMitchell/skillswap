function HeaderDropDown({ obj, isShown, setIsShown, category, showRight, setFilter }) {
    //fetch all users associated with the selected skill.
    async function handleClick(skill) {
        setFilter(prev => ({
            ...prev,
            category: category,
            skill: skill
        }));
        setIsShown(false);
    };
    
    return(
        <div id='dropDown' className={`${isShown ? 'block' : 'hidden'} absolute top-full ${showRight ? 'sm:right-0' : 'sm:left-0'} w-full w-max h-72 py-5 grid grid-cols-2 sm:gap-x-5 bg-stone-950 sm:px-50 shadow-xl overflow-y-auto no-scrollbar`}>
            {obj?.skills.map((skill) => {
                return(
                    <p key={skill} onClick={() => handleClick(skill)} className='p-5 text-stone-500 hover:text-stone-400 hover:bg-stone-700 text-xs sm:text-nowrap hover:cursor-pointer'>{skill}</p>
                );
            })};
        </div>
    );
};

export default HeaderDropDown;