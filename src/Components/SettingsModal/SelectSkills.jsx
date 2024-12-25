import { UpdateSkillsList } from './SMLists';
import SkillListContainer from './SkillListContainer';

function SelectSkills({ text }) {
    return(
        <SkillListContainer text={text} list={<UpdateSkillsList />} />
    );
};

export default SelectSkills;