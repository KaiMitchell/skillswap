import Card from '../../Profile/Card.jsx';

function MappedProfiles({
    profiles,
    whichfilter,
    requests,
    fetchRequests,
    mappedProfiles,
    isToLearn,
    setIsSignInPrompt,
    isToLearnProfiles,
    setIsDisabled,
    isDisabled,
}) {
    mappedProfiles = profiles?.map((obj) => {
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
                //appliy category filters to profiles
                skills = obj.skills;
            } else if(isToLearn) {
                //apply filters to learn profiles
                skills = obj.to_learn;
            } else if(!isToLearn) {
                //apply filters to teach profiles
                skills = obj.to_teach;
            };       
        } else {
            skills = obj.to_teach || obj.to_learn;
        };
        
        return(
            <Card 
                key={obj?.username}
                isToLearn={isToLearn}
                profileData={obj}
                fetchRequests={fetchRequests} 
                isrequested={isRequested}
                requests={requests} 
                skills={skills}
                isToLearnProfiles={isToLearnProfiles}
                setIsSignInPrompt={setIsSignInPrompt}
                setIsDisabled={setIsDisabled}
                isDisabled={isDisabled}
            />
        );
    });
    return mappedProfiles;
};

export default MappedProfiles;