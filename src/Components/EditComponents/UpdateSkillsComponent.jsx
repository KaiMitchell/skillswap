import UpdatedSkillsUl from './UpdatedSkillsUl';

function UpdateSkillsComponent({ text }) {
    return(
        <div className='min-h-1/2'>
            <h3 className='text-xl font-bold'>{text}</h3>
            <UpdatedSkillsUl />
        </div>
    );
};

export default UpdateSkillsComponent;