import { useState } from "react";
import InitialUl from "../UL";

function Card({ 
    index, 
    obj, 
    isPickMatches, 
    selectedSkills, 
    handleSkillAdd,
    selectedOpposite,
}) {
    const [isShowSkills, setIsShowSkills] = useState(false);

    //identify the categories that have a skill selected within them
    const isCategorySelected = obj.skills.some((skill) => selectedSkills.includes(skill));   
    //identify the skills selected within the opposite type and disable them to prevent duplicates
    // const isOppositeSelected = obj.skills.some((skill) => selectedOpposite.includes(skill));    

    return(
        <div
            className={`relative flex group justify-center items-center p-2.5 text-xs ${isCategorySelected ? 'bg-stone-900 text-white' : 'bg-stone-950'} hover:font-bold hover:bg-white text-stone-300 hover:text-black`}
            // disabled={isOppositeSelected}
            onClick={() => setIsShowSkills(true)}
            onMouseLeave={() => setIsShowSkills(false)}
        >
            <div className={`${isShowSkills ? 'block' : 'hidden'} w-full absolute top-full z-20 bg-white`}>
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
        </div>
    )
};

export default Card;