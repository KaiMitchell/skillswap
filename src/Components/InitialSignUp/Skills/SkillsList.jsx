import Button from "../../../commonComponents/Button";

function SkillsList({ 
    handleSkillAdd, 
    skill, 
    selectedSkills,
    selectedOpposite,
}) {

    return(
        <li>
            <Button 
                handleOnClick={() => handleSkillAdd(skill)} 
                styles={`py-2.5 w-full
                    ${selectedSkills.includes(skill) ? 'bg-green-500' : ''} 
                    ${selectedSkills.includes(skill) ? 'hover:bg-green-500' : 'hover:bg-stone-950'} 
                    ${selectedSkills.includes(skill) ? 'bg-green-600' : ''} 
                    ${selectedSkills.includes(skill) ? 'text-stone-900' : 'text-stone-300'} 
                    ${selectedOpposite.includes(skill) && 'line-through bg-stone-950'}
                    cursor-pointer`
                }
                isDisabled={selectedOpposite.includes(skill)}
                text={skill}
            />
        </li>
    );
};

export default SkillsList;