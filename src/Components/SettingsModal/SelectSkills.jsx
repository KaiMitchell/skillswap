import SkillsList from './SMLists';
import SkillListContainer from './SkillListContainer';

function SelectSkills({ text, skills }) {

    return(
        <SkillListContainer text={text} list={<SkillsList skills={skills} />} />
    );
};

export default SelectSkills;