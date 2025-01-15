import HorizontalListItems from '../../commonComponents/HorizontalListItems.jsx';

function CardSkills({ 
    profileData, 
    isRenderAllSkills, 
    type,
}) {
    return(
        <div className={`${isRenderAllSkills ? 'visible': 'hidden'} h-1/2`}>
            <p className='ml-2.5 pb-0 text-large font-bold'>{type}</p>
            <HorizontalListItems data={profileData?.skills} />
        </div>
    );
};

export default CardSkills;