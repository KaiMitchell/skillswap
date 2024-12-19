import { useState, useEffect } from 'react';

function PickSkillList({ index, handleSkillAdd, skill, selectedSkills }) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        selectedSkills.includes(skill) && setIsSelected(true);
    }, [isSelected]);

    function handleClick() {
        handleSkillAdd(skill);
    };

    return(
        <li onClick={() => handleClick()} className={`py-2.5 ${isSelected || selectedSkills.includes(skill) ? 'bg-green-500' : ''} ${isSelected || selectedSkills.includes(skill) ? 'hover:bg-green-600' : ''} ${index % 2 === 0 ? 'hover:bg-red-500' : 'hover:bg-stone-600'} w-full cursor-pointer`}>
            {skill}
        </li>
    );
};

export default PickSkillList;