import ProfileCard from '../ProfileCard/ProfileCard.jsx';

function ToLearnProfiles({
    learnprofiles,
    whichfilter,
    sentRequests,
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
            <ProfileCard sentRequests={sentRequests} key={obj.username} skills={skills} name={obj.username} />
        );
    });
    return mappedlearnprofiles;
};

function ToTeachProfiles({
    teachprofiles,
    whichfilter,
    sentRequests,
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
            <ProfileCard sentRequests={sentRequests} key={obj.username} skills={skills} name={obj.username} />
        );
    });
    return mappedteachprofiles;
};

export {
    ToLearnProfiles,
    ToTeachProfiles
};