import HorizontalListItems from '../../commonComponents/HorizontalListItems.jsx';

function CardSkills({ 
    profileData, 
    isRenderAllSkills, 
    type,
}) {
    return(
        <div className={`${isRenderAllSkills ? 'visible': 'hidden'} w-full h-1/3`}>
            <p className='ml-2.5 pb-0 text-large font-bold'>{type}</p>
            <HorizontalListItems data={profileData?.skills} />
        </div>
    );
};

export default CardSkills;