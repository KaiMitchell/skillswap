import CardDetails from "./CardDetails";

const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
const imgURL = 'http://localhost:3000/';

function CardLayout({ 
    skills,
    profileData,
    fetchRequests, 
    requests,
    sendMatchRequest,
    isRequested
}) {
    
    //img url path to serve img file from my server
    const imgPath = imgURL + profileData?.profile_picture;
    const name = profileData?.username;

    let displayedSkill;

    if(Array.isArray(skills) && skills.length > 0) {
        displayedSkill = skills[0];
    } else {
        displayedSkill = skills;
    };
    
    return(
        <div className='relative bg-white bg-contain w-full rounded bg-center'>
            <div className='relative w-full flex h-64'>
                <div className='relative w-1/3'>
                    <img 
                        className='w-full h-full object-cover rounded-l' 
                        src={profileData?.profile_picture ? imgPath : defaultProfileImg} 
                    />
                    <h3 className='absolute top-0 left-0 px-5 py-1 w-full text-2xl rounded-tl bg-black bg-opacity-30'>{name}</h3>
                </div>
                <CardDetails 
                    username={name}
                    displayedSkill={displayedSkill}
                    skills={skills} 
                    description={profileData?.description}
                    requests={requests}
                    sendMatchRequest={sendMatchRequest}
                    isRequested={isRequested}
                    fetchRequests={fetchRequests}
                />
            </div>
        </div>
    );
};

export default CardLayout;