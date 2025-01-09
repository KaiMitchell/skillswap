import { CurrentSkillsToLearn, CurrentSkillsToTeach, UpdateSkillsList } from './SMLists';
import SkillListContainer from './SkillListContainer';

function SelectSkills({ text, skills }) {
    let component;
    switch(text) {
        case 'Pick skills to teach':
            component = <UpdateSkillsList />;
            break;
        // case 'Pick skills to learn':
        //     component = <CurrentSkillsToLearn />;
        //     break;
        case 'Skills you want to learn':
            component = <CurrentSkillsToLearn skills={skills} />;
            break;
        case 'Skills you can teach':
            component = <CurrentSkillsToTeach skills={skills} />;
            break;
    };
    return(
        <SkillListContainer text={text} list={component} />
    );
};

export default SelectSkills;