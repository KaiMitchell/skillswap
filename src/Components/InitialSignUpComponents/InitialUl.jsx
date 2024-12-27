import PickSkillList from "./pickSkillList";

function InitialUl({ isSelected, index, handleSkillAdd, selectedSkills, isPickMatches, obj }) {
    return(
        <ul className={`hidden rounded-md group-hover:block group-hover:w-full h-64 pt-1 group-hover:flex flex-col self-center items-center gap-2.5 ${index % 2 === 0 ? 'bg-red-600' : 'bg-stone-700'} ${isSelected ? 'bg-green-400' : ''} shadow-inner overflow-y-auto no-scrollbar`}>
            {isPickMatches ?
                //Displayed skills for potential match
                obj.skills?.map((skill, index) => <li key={index}>{skill}</li>)
            :
                obj.skills?.map(skill => {
                   return(
                        <PickSkillList key={skill} skill={skill} index={index} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} />
                   );
                })
            }
        </ul>
    );
};

export default InitialUl;