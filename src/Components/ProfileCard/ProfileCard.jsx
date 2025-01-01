import ProfileCardFooter from "./ProfileCardFooter";
import ProfileCardMain from "./ProfileCardMain";

function ProfileCard({ fetchRequests, requests, img, skills, name }) {

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
        const data = await response.json();
        console.log(data);
    };
    return(
        <div className='flex flex-col bg-black items-center my-10 shadow-xl bg-white'>
            {/* <div className='relative bg-contain h-64 w-full bg-center' style={{backgroundImage: `url(${img})`}}> */}
            <ProfileCardMain 
                name={name} 
                skills={skills} 
            />
            <ProfileCardFooter 
                city='city' 
                availability='availability' 
                requests={requests}
                sendMatchRequest={sendMatchRequest}
                username={name}
                fetchRequests={fetchRequests}
            />
        </div>
    );
};

export default ProfileCard;