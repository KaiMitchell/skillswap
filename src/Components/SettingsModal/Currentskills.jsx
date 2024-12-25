import { CurrentSkillsList } from './SMLists';
import SkillListContainer from './SkillListContainer';

function CurrentSkills({ text }) {
    return(
        <SkillListContainer text={text} list={<CurrentSkillsList />} />
    );
};

export default CurrentSkills;