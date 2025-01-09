import { CurrentSkillsList } from './SMLists';
import SkillListContainer from './SkillListContainer';

function CurrentSkills({ text, skills }) {
    return(
        <SkillListContainer text={text} list={<CurrentSkillsList skills={skills} />} />
    );
};

export default CurrentSkills;