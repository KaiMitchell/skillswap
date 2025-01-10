function Skills({ profileData }) {
    return(
        <>
            {profileData?.skills.map(skill => 
            <li 
                className={`${!profileData.isSkills ? 'absolute transform -translate-x-1/2 -translate-y-1/2 ' : 'block'} top-1/2 left-1/2 text-xs`} 
                key={skill}
            >
                {skill}
            </li>)}
        </>
    );
};

function Details({ isRenderAllSkills, description }) {
    //REPLACE DESCRIPTION AND PREFERENCES DATA WITH DATA FROM PROFILE
    return(
        <div className={`${isRenderAllSkills ? 'hidden' : 'block'} flex flex-col gap-2.5 mt-10 h-full w-full px-5`}>
            <div className='flex gap-2.5 items-center'>
                <h3>Preferrence:</h3>
                <p className='text-xs'>In person</p>
            </div>
            <div className='h-16'>
                <div className='relative h-full overflow-y-auto no-scrollbar'>
                    <p className=''>{description}</p>
                </div>
            </div>
        </div>
    );
}

export {
    Skills,
    Details
};