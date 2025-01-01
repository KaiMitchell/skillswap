import ProfileCard from '../ProfileCard/ProfileCard.jsx';

function ToLearnProfiles({
    learnprofiles,
    whichfilter,
    requests,
    fetchRequests,
    mappedlearnprofiles
}) {
    mappedlearnprofiles = learnprofiles?.map((obj) => {
        //render skills based on whether user is filtering from nav or main options
        let skills;
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
            <ProfileCard 
                fetchRequests={fetchRequests} 
                requests={requests} 
                key={obj.username} 
                skills={skills} 
                name={obj.username} 
            />
        );
    });
    return mappedlearnprofiles;
};

function ToTeachProfiles({
    teachprofiles,
    whichfilter,
    sentRequests,
    fetchRequests,
    mappedteachprofiles
}) {
    mappedteachprofiles = teachprofiles?.map((obj) => {
        //render skills based on whether user is filtering from nav or main options
        let skills;
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
            <ProfileCard 
                fetchRequests={fetchRequests} 
                sentRequests={sentRequests} 
                key={obj.username} 
                skills={skills} 
                name={obj.username} 
            />
        );
    });
    return mappedteachprofiles;
};

export {
    ToLearnProfiles,
    ToTeachProfiles
};