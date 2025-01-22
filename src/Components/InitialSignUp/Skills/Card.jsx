import InitialUl from "../UL";

function Card({ 
    index, 
    obj, 
    isPickMatches, 
    selectedSkills, 
    handleSkillAdd,
    selectedOpposite,
}) {
    //identify the categories that have a skill selected within them
    const isCategorySelected = obj.skills.some((skill) => selectedSkills.includes(skill));   
    //identify the skills selected within the opposite type and disable them to prevent duplicates
    const isOppositeSelected = obj.skills.some((skill) => selectedOpposite.includes(skill));    

    return(
        <button 
            className={`relative flex group justify-center items-center p-2.5 text-xs ${isCategorySelected ? 'bg-stone-900' : 'bg-stone-950'} hover:bg-stone-900 text-stone-300 hover:text-stone-400`}
            disabled={isOppositeSelected}
        >
            <div className='hidden w-full group-hover:block absolute top-full z-20'>
                <InitialUl 
                    isPickMatches={isPickMatches} 
                    obj={obj} 
                    index={index} 
                    selectedSkills={selectedSkills} 
                    selectedOpposite={selectedOpposite}
                    handleSkillAdd={handleSkillAdd} 
                />
            </div>
            <h3 className='text-wrap'>{obj.category}</h3>
        </button>
    )
};

export default Card;