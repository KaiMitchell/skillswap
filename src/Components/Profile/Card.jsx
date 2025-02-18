import { useState } from "react";
import CardLayout from "./CardLayout";

function Card({ 
    isRequested, 
    fetchRequests, 
    requests, 
    skills, 
    profileData,
    isToLearn,
    setIsSignInPrompt,
    setIsDisabled,
    isDisabled,
    setRemount,
}) {
    const [isSendingRequest, setIsSendingRequest] = useState(false);
    
    //dynamically display a priority skill
    let prioritySkill;
    if(isToLearn) {
        if(profileData.toLearnPriority) prioritySkill = profileData.toLearnPriority;
    } else {
        if(profileData.toTeachPriority) prioritySkill = profileData.toTeachPriority;
    };

    async function sendMatchRequest(isRequested) {
        setIsDisabled(true);
        const currentUser = localStorage.getItem('user');

        //Send the isRequested arg to be able to tell if the fetch should delete or insert a record
        await fetch(`${import.meta.env.VITE_API_URL}/api/handle-match-request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                currentUser: currentUser, 
                selectedUser: profileData?.username, 
                isRequested: isRequested 
            })          
        });
        setRemount(prev => prev + 1);
        setIsDisabled(false);
    };

    return(
            <CardLayout 
                skills={skills} 
                profileData={profileData}
                requests={requests}
                sendMatchRequest={sendMatchRequest}
                isRequested={isRequested}
                fetchRequests={fetchRequests}
                isToLearn={isToLearn}
                isSendingRequest={isSendingRequest}
                setIsSendingRequest={setIsSendingRequest}
                prioritySkill={prioritySkill}
                setIsSignInPrompt={setIsSignInPrompt}
                setIsDisabled={setIsDisabled}
                isDisabled={isDisabled}
            />
    );
};

export default Card;