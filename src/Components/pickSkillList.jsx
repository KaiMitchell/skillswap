import { useState, useEffect } from 'react';

function PickSkillList({ index, handleSkillAdd, skill, selectedSkills }) {
    const [isSelected, setIsSelected] = useState(false);

    let backgroundHover;
    if(index % 2 === 0 && !isSelected && !selectedSkills.includes(skill)) {
        backgroundHover = 'hover:bg-red-500';
    } else if(index % 2 !== 0 && !isSelected && !selectedSkills.includes(skill)) {
        backgroundHover = 'hover:bg-stone-600';
    } else if(isSelected || selectedSkills.includes(skill)) {
        backgroundHover = 'hover:bg-green-600';
    };

    function handleClick() {
        handleSkillAdd(skill);
    };

    return(
        <li onClick={() => handleClick()} className={`py-2.5 ${isSelected || selectedSkills.includes(skill) ? 'bg-green-500' : ''} ${backgroundHover} w-full cursor-pointer`}>
            {skill}
        </li>
    );
};

export default PickSkillList;