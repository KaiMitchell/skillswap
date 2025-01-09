import SkillListContainer from './SkillListContainer';

function DeleteSkills({ text }) {
    return(
        <SkillListContainer text={text} list={<UpdateSkillsList />} />
    );
};

export default DeleteSkills;