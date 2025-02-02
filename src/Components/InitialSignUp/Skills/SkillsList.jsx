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
                styles={`py-2.5 w-full font-normal
                    ${selectedSkills.includes(skill) ? 'bg-black/10 text-stone-800' : 'text-black'} 
                    ${selectedOpposite.includes(skill) && 'line-through hover:font-normal'}
                    cursor-pointer hover:font-bold`
                }
                isDisabled={selectedOpposite.includes(skill)}
                text={skill}
            />
        </li>
    );
};

export default SkillsList;