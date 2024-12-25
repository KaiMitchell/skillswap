function SkillListContainer({ list, text }) {
    return(
        <div className='min-h-1/2 w-full'>
            <h3 className='text-xl font-bold text-right'>{text}</h3>
            {list}
        </div>
    );
};

export default SkillListContainer;