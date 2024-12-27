import { useState } from 'react';
import InitialUl from "./InitialUl";

function PickSkillsCard({ index, obj, isPickMatches, selectedSkills, handleSkillAdd }) {
    
    return(
        <button onClick={() => setShowSkills(true)} className={`relative flex group justify-center items-center p-2.5 text-xs bg-stone-950 hover:bg-stone-900 text-stone-300 hover:text-stone-400`}>
            <div className='hidden w-full group-hover:block absolute top-full z-20'>
                <InitialUl isPickMatches={isPickMatches} obj={obj} index={index} selectedSkills={selectedSkills} handleSkillAdd={handleSkillAdd} />
            </div>
            <h3 className='text-wrap'>{obj.category}</h3>
        </button>
    )
};

export default PickSkillsCard;