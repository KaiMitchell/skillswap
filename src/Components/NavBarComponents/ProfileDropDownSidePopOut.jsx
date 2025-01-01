import { useState } from "react";

function ProfileDropDownSidePopOut({ sentRequests, fetchSentRequests }) {
    // const [isRequested, setIsRequested] = useState(false);

    async function handleMatchRequests(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        const data = await response.json();
        console.log(data);
        fetchSentRequests(selectedUser);
    };
    return(
        <div className={`group-hover:block hidden absolute -left-full w-full top-0 h-max size-10 bg-blue-500`}>
            <h3 className={``}>Current requests</h3>
            <ul>
                {sentRequests?.sent_requests.map(request => {

                    return(
                        <li key={request}
                            className='text-sm p-2.5'
                            onClick={() => handleMatchRequests(request)}>
                            Pending: {request}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProfileDropDownSidePopOut;