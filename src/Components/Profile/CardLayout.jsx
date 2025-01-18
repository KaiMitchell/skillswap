import CardDetails from "./CardDetails";

const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
const imgURL = 'http://localhost:3000/';

function CardLayout({ 
    skills,
    profileData,
    fetchRequests, 
    requests,
    sendMatchRequest,
    isRequested,
    isToLearn,
    isSendingRequest,
    setIsSendingRequest,
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
        <div className='relative bg-white bg-contain w-full bg-center'>
            <div className='relative w-full flex h-64'>
                <img 
                    className='object-scale-down w-1/3 h-full sm:hidden sm:size-1/4 lg:block lg:w-1/3 lg:h-full' 
                    src={profileData?.profile_picture ? imgPath : defaultProfileImg} 
                />
                <CardDetails 
                    username={name}
                    isToLearn={isToLearn}
                    displayedSkill={displayedSkill}
                    skills={skills} 
                    profileData={profileData}
                    defaultProfileImg={defaultProfileImg}
                    requests={requests}
                    sendMatchRequest={sendMatchRequest}
                    isRequested={isRequested}
                    fetchRequests={fetchRequests}
                    imgPath={imgPath}
                    isSendingRequest={isSendingRequest}
                    setIsSendingRequest={setIsSendingRequest}
                />
            </div>
        </div>
    );
};

export default CardLayout;