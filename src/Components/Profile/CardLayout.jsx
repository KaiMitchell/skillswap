import CardDetails from "./CardDetails";

const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
const imgURL = 'http://localhost:3000/';

function CardLayout({ 
    skills,
    profileData
}) {
    //img url path to serve img file from my server
    const imgPath = imgURL + profileData?.profile_picture;
    const name = profileData?.username;

    let skill;

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
                        src={profileData?.profile_picture ? imgPath : defaultProfileImg} />
                    <h3 className="hidden sm:block absolute top-2.5 sm:left-2.5 font-bold text-xl px-2.5 rounded-tl-lg bg-black bg-opacity-30">
                        {name}
                    </h3>
                </div>
                <CardDetails 
                    username={name} 
                    skills={skills} 
                    description={profileData?.description}
                />
            </div>
        </div>
    );
};

export default CardLayout;