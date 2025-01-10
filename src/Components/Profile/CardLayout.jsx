import CardDetails from "./CardDetails";

function CardLayout({ 
    name, 
    skills,
    profilePicture 
}) {
    let skill;

    profilePicture && console.log(profilePicture);

    if(Array.isArray(skills) && skills.length > 0) {
        skill = skills[0];
    } else {
        skill = skills;
    };
    return(
        <div className='relative bg-white bg-contain w-full rounded-t-lg bg-center'>
            <div className='relative flex h-64'>
                <div className='w-full h-full p-2.5'>
                    {/* Just a placeholder image for development purposes */}
                    <img 
                        className='object-cover h-full rounded-lg' 
                        src={profilePicture} />
                    <h3 className="hidden sm:block absolute top-2.5 sm:left-2.5 font-bold text-xl px-2.5 rounded-tl-lg bg-black bg-opacity-30">
                        {name}
                    </h3>
                    {/* <h3 className="hidden sm:block absolute bottom-2.5 left-2.5 font-bold text-xl px-2.5 bg-black bg-opacity-30">
                        {skill}
                    </h3> */}
                </div>
                <CardDetails username={name} skills={skills} />
            </div>
        </div>
    );
};

export default CardLayout;