import PickSkillList from "./Skills/SkillsList";

function UL({ 
    isSelected, 
    index, 
    handleSkillAdd, 
    selectedSkills, 
    isPickMatches, 
    obj,
    selectedOpposite,
}) {
    return(
        <ul className={`hidden group-hover:block w-full h-48 border-t text-xs shadow-inner overflow-y-auto no-scrollbar`}>
            {isPickMatches ?
                //Displayed skills for potential match
                obj.skills?.map((skill, index) => <li key={index}>{skill}</li>)
            :
                obj.skills?.map(skill => {
                   return(
                        <PickSkillList 
                            key={skill} 
                            skill={skill} 
                            index={index} 
                            handleSkillAdd={handleSkillAdd} 
                            selectedSkills={selectedSkills}
                            selectedOpposite={selectedOpposite} 
                        />
                   );
                })
            }
        </ul>
    );
};

export default UL;