import SkillsList from './SMLists';
import SkillListContainer from './SkillListContainer';

function SelectSkills({ 
    text, 
    skills, 
    handleSkill,
 }) {
    return(
        <SkillListContainer 
            text={text} 
            list={<SkillsList 
                    skills={skills}
                    handleSkill={handleSkill}
                    text={text}
            />} 
    />
    );
};

export default SelectSkills;