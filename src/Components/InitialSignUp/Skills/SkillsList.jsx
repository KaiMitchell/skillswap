function SkillsList({ handleSkillAdd, skill, selectedSkills }) {

    return(
        <li 
            onClick={() => handleSkillAdd(skill)} 
            className={`py-2.5 
                ${selectedSkills.includes(skill) ? 'bg-green-500' : ''} 
                ${selectedSkills.includes(skill) ? 'hover:bg-green-500' : 'hover:bg-stone-950'} 
                ${selectedSkills.includes(skill) ? 'bg-green-600' : ''} 
                ${selectedSkills.includes(skill) ? 'text-stone-900' : 'stone-300'} 
                cursor-pointer`
            }
        >
            {skill}
        </li>
    );
};

export default SkillsList;