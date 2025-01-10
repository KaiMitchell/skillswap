import Card from '../../Profile/Card.jsx';

const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
const imgURL = 'http://localhost:3000/';

function ToLearnProfiles({
    learnprofiles,
    whichfilter,
    requests,
    fetchRequests,
    mappedlearnprofiles,
    reMount
}) {
    mappedlearnprofiles = learnprofiles?.map((obj) => {
        //render skills based on whether user is filtering from nav or main options
        let skills; 
        let isRequested = false;

        for(const request of requests?.sent) {
            if(request === obj.username) {
                isRequested = true
            };
        };

        if(whichfilter.headerFilter) {
            skills = obj.name; //skill name
        } else if(whichfilter.mainFilter) {
            if(obj.skills){
                skills = obj.skills;
            } else {
                skills = obj.to_learn;
            };
        } else {
            skills = obj.to_learn;
        };
        
        return(
            <Card 
                fetchRequests={fetchRequests} 
                isrequested={isRequested}
                requests={requests} 
                profilePicture={obj?.profile_picture ? imgURL + obj.profile_picture : defaultProfileImg}
                key={obj.username} 
                skills={skills} 
                name={obj.username} 
                reMount={reMount}
            />
        );
    });
    return mappedlearnprofiles;
};

function ToTeachProfiles({
    teachprofiles,
    whichfilter,
    requests,
    fetchRequests,
    mappedteachprofiles,
    reMount
}) {
    mappedteachprofiles = teachprofiles?.map((obj) => {
        //render skills based on whether user is filtering from nav or main options
        let skills;
        let isRequested = false;
        for(const request of requests?.sent) {
            if(request === obj.username) {
                isRequested = true
            };
        };
        if(whichfilter.headerFilter) {
            skills = obj.name; //skill name
        } else if(whichfilter.mainFilter) {
            if(obj.skills){
                skills = obj.skills;
            } else {
                skills = obj.to_teach;
            };
        } else {
            skills = obj.to_teach;
        };
        return(
            <Card 
                fetchRequests={fetchRequests} 
                isrequested={isRequested}
                requests={requests} 
                profilePicture={obj?.profile_picture ? imgURL + obj.profile_picture : defaultProfileImg}
                key={obj.username} 
                skills={skills} 
                name={obj.username} 
                reMount={reMount}
            />
        );
    });
    return mappedteachprofiles;
};

export {
    ToLearnProfiles,
    ToTeachProfiles
};