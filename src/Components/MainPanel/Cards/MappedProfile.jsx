import Card from '../../Profile/Card.jsx';

function MappedProfiles({
    profiles,
    whichfilter,
    requests,
    fetchRequests,
    mappedProfiles,
    reMount,
    isToLearn
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

                skills = obj.skills;

            } else if(isToLearn) {

                skills = obj.to_learn;
                console.log('obj.toLearn');

            } else if(!isToLearn) {

                skills = obj.to_teach;
                console.log('to teach');

            };
            
        } else {

            skills = obj.to_teach || obj.to_learn;

        };
        
        return(
            <Card 
                key={obj?.username}
                profileData={obj}
                fetchRequests={fetchRequests} 
                isrequested={isRequested}
                requests={requests} 
                skills={skills} 
                reMount={reMount}
            />
        );
    });
    return mappedProfiles;
};

export default MappedProfiles;