import MapData from '../../features/methods/MapData.jsx';

function CardSkills({ 
    profileData, 
    isRenderAllSkills, 
    type,
}) {
    return(
        <div className={`${isRenderAllSkills ? 'block': 'hidden'} h-1/3`}>
            <p className='ml-2.5 pb-0 text-large font-bold'>{type}</p>
            <ul className={`relative h-full p-2.5 bg-zinc-200 overflow-y-auto no-scrollbar`}>
                <MapData 
                    data={profileData?.skills}
                    styles={`${!profileData?.isSkills ? 'absolute transform -translate-x-1/2 -translate-y-1/2' : 'block'} top-1/2 left-1/2 text-xs`}
                /> 
            </ul>
        </div>
    );
};

export default CardSkills;