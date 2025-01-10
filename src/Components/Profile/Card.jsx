import CardFooter from "./CardFooter";
import CardLayout from "./CardLayout";

function Card({ 
    isRequested, 
    reMount, 
    fetchRequests, 
    requests, 
    profilePicture, 
    skills, 
    name 
}) {
    async function sendMatchRequest(isRequested) {
        const currentUser = localStorage.getItem('user');
        //Send the isRequested arg to be able to tell if the fetch should delete or insert a record
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ currentUser: currentUser, selectedUser: name, isRequested: isRequested })
        });
        // const data = await response.json();
        reMount(JSON.stringify(isRequested + name));
    };
    return(
        <div className=''>
            <CardLayout 
                name={name} 
                skills={skills} 
                profilePicture={profilePicture}
            />
            <CardFooter 
                city='city' 
                skills={skills}
                availability='availability' 
                requests={requests}
                sendMatchRequest={sendMatchRequest}
                username={name}
                isRequested={isRequested}
                fetchRequests={fetchRequests}
            />
        </div>
    );
};

export default Card;