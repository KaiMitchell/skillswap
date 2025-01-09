import { CurrentSkillsToLearn, UpdateSkillsList } from './SMLists';
import SkillListContainer from './SkillListContainer';

function SelectSkills({ text, skills }) {
    let component;
    switch(text) {
        case 'Pick skills to teach':
            component = <UpdateSkillsList />;
            break;
        case 'Pick skills to learn':
            component = <CurrentSkillsToLearn />;
        case 'Skills you can learn':
            component = <CurrentSkillsToLearn skills={skills} />;
        case 'Skills you can teach':
            component = <CurrentSkillsToLearn skills={skills} />;
    };
    return(
        <SkillListContainer text={text} list={component} />
    );
};

export default SelectSkills;