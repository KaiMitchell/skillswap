function RenderProfileSkills({ profileData }) {
    return(
        <>
            {profileData?.skills.map(skill => 
            <li 
                className={`${!profileData.isSkills ? 'absolute transform -translate-x-1/2 -translate-y-1/2 ' : 'block'} top-1/2 left-1/2 text-white text-xs`} 
                key={skill}
            >
                {skill}
            </li>)}
        </>
    );
};

function RenderProfileDetails({ isRenderAllSkills }) {
    //REPLACE DESCRIPTION AND PREFERENCES DATA WITH DATA FROM PROFILE
    return(
        <div className={`${isRenderAllSkills ? 'hidden' : 'block'} flex flex-col gap-2.5 mt-10 h-full w-full px-5`}>
            <div className='flex gap-2.5 items-center'>
                <h3>Preferrence:</h3>
                <p className='text-xs'>In person</p>
            </div>
            <div className='h-4/6'>
                <h3 className=''>Description:</h3>
                <div className='relative h-full overflow-y-auto no-scrollbar'>
                    <p className='text-xs'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione eveniet sequi, delectus quas id ducimus? Consequatur vitae adip, dolor sit amet consectetur adipisicing elit. Ratione eveniet sequi, delectus quas id ducimus? Consequatur vitae adipisci iusto, quisquam perspiciatis natus sequi quaerat provident, quas voluptate repellendus nihil magnam!</p>
                </div>
            </div>
        </div>
    );
}

export {
    RenderProfileSkills,
    RenderProfileDetails
};