import SkillsList from './SMLists';

function SelectSkills({ 
    text, 
    skills, 
    handleSkill,
 }) {
    return(
        <div className='min-h-1/2 w-full'>
            <h3 className='text-xl font-bold text-right'>{text}</h3>
            <SkillsList
                skills={skills}
                handleSkill={handleSkill}
                text={text}
            />
        </div>
    );
};

export default SelectSkills;