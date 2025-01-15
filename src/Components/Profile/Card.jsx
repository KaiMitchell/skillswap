import CardFooter from "./CardFooter";
import CardLayout from "./CardLayout";

function Card({ 
    isRequested, 
    reMount, 
    fetchRequests, 
    requests, 
    skills, 
    profileData
}) {
    async function sendMatchRequest(isRequested) {

        const currentUser = localStorage.getItem('user');

        //Send the isRequested arg to be able to tell if the fetch should delete or insert a record
        await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                currentUser: currentUser, 
                selectedUser: 
                profileData?.username, 
                isRequested: isRequested 
            })
        });
        
        //send a unique value for state update to re render the page
        reMount(JSON.stringify(isRequested + profileData?.username));
    };
    return(
        <div>
            <CardLayout 
                skills={skills} 
                profileData={profileData}
                requests={requests}
                sendMatchRequest={sendMatchRequest}
                isRequested={isRequested}
                fetchRequests={fetchRequests}
            />
        </div>
    );
};

export default Card;