import ProfileCardMobileComponents from "./ProfileCardMobileComponents";

function ProfileCardMain({ name, skills }) {
    let skill;
    if(Array.isArray(skills) && skills.length > 0) {
        skill = skills[0];
    } else {
        skill = skills;
    };
    return(
        <div className='relative bg-stone-700 bg-contain h-64 w-full bg-center'>
            <div className='w-1/2 sm:w-full h-full absolute right-0'>
                <img className='object-cover h-full' src='https://static.vecteezy.com/system/resources/previews/035/187/362/non_2x/ai-generated-man-guy-model-look-white-smile-face-portrait-confidence-african-isolated-handsome-photo.jpg' />
            </div>
            <ProfileCardMobileComponents username={name} />
            <>  
                <h3 className="hidden sm:block absolute top-0 sm:right-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{name}</h3>
                <h3 className="hidden sm:block absolute bottom-14 left-0 font-bold text-3xl p-2.5 bg-black bg-opacity-50">{skill}</h3>
            </>
        </div>
    );
};

export default ProfileCardMain;