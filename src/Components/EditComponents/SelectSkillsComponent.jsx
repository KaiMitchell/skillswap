import SelectSkillsUl from './SelectSkillsUl';

function SelectSkillsComponent({ text }) {
    return(
        <div className='min-h-1/2'>
            <h3 className='text-xl font-bold'>{text}</h3>
            <SelectSkillsUl />
        </div>
    );
};

export default SelectSkillsComponent;