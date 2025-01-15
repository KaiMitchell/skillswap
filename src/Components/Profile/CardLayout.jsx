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

    let skill;

    if(Array.isArray(skills) && skills.length > 0) {
        skill = skills[0];
    } else {
        skill = skills;
    };
    
    return(
        <div className='relative bg-white bg-contain w-full rounded-t-lg bg-center'>
            <div className='relative w-full flex h-64'>
                <img 
                    className='w-1/3 h-full object-cover rounded-lg' 
                    src={profileData?.profile_picture ? imgPath : defaultProfileImg} 
                />
                <CardDetails 
                    username={name} 
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