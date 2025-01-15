import HorizontalListItems from '../../commonComponents/HorizontalListItems.jsx';

function CardSkills({ 
    profileData, 
    isRenderAllSkills, 
    type,
}) {
    return(
        <div className={`${isRenderAllSkills ? 'block' : 'hidden'} h-1/4`}>
            <p className='ml-2.5 text-large font-bold'>{type}</p>
            <HorizontalListItems data={profileData?.skills} />
        </div>
    );
};

export default CardSkills;