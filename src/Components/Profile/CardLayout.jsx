import CardDetails from "./CardDetails";

function CardLayout({ name, skills }) {
    let skill;
    if(Array.isArray(skills) && skills.length > 0) {
        skill = skills[0];
    } else {
        skill = skills;
    };
    return(
        <div className='relative bg-stone-700 bg-contain w-full bg-center'>
            <>  
                <h3 className="hidden sm:block absolute top-0 sm:left-0 font-bold text-xl px-2.5 bg-black bg-opacity-30">
                    {name}
                </h3>
                <h3 className="hidden sm:block absolute bottom-0 left-0 font-bold text-xl px-2.5 bg-black bg-opacity-30">
                    {skill}
                </h3>
            </>
            <div className='flex h-64'>
                <div className='w-full h-full'>
                    {/* Just a placeholder image for development purposes */}
                    <img className='object-cover h-full' src='https://static.vecteezy.com/system/resources/previews/035/187/362/non_2x/ai-generated-man-guy-model-look-white-smile-face-portrait-confidence-african-isolated-handsome-photo.jpg' />
                </div>
                <CardDetails username={name} skills={skills} />
            </div>
        </div>
    );
};

export default CardLayout;