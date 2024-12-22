import PickSkillList from "./pickSkillList";

function InitialUl({ index, skills, handleSkillAdd, selectedSkills, isPickMatches, array }) {
    return(
        <ul className={`hidden rounded-md group-hover:block group-hover:w-full h-64 pt-1 group-hover:flex flex-col self-center items-center gap-2.5 ${index % 2 === 0 ? 'bg-red-600' : 'bg-stone-700'} shadow-inner overflow-y-auto no-scrollbar`}>
            {isPickMatches ?
                skills.map((skill, index) => <li key={index}>{skill}</li>)
            :
                array.map(skill => {
                   return(
                        <PickSkillList key={skill} skill={skill} index={index} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} />
                   );
                })
            }
        </ul>
    );
};

export default InitialUl;