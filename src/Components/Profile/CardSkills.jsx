import HorizontalListItems from '../../commonComponents/HorizontalListItems.jsx';

function CardSkills({ 
    profileData, 
    isRenderAllSkills, 
    type,
}) {
    return(
        <div className={`${isRenderAllSkills ? 'block' : 'hidden'} flex w-full lg:flex-col`}>
            <p className='min-w-20 ml-2.5 text-xs font-bold lg:text-large'>{type}</p>
            <HorizontalListItems data={profileData?.skills} />
        </div>
    );
};

export default CardSkills;