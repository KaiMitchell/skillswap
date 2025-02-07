import PopOutOptions from "./PopOutOptions";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

function ProfileDropDownSidePopOut({ 
    displayProfile,
    data, 
    fetchData, 
    text,                  
    setRemount,     
}) {
    const [isHandleRequestFeedback, setIsHandleRequestFeedback] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    //extract token from Context property
    const accessToken = sessionStorage.getItem('access token');
    
    //remove a pending match request you sent
    async function removeMatchRequests(selectedUser) {
        console.log('clicked');
        setIsDisabled(true);
        setIsHandleRequestFeedback(selectedUser);
        const username = localStorage.getItem('user');
        await fetch(`${apiUrl}/api/handle-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
             },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        fetchData();
        setIsHandleRequestFeedback('');
        setIsDisabled(false);
    };

    //accept a match request sent to user
    async function acceptMatchRequest(selectedUser) {
        console.log('clicked');
        setIsDisabled(true);
        setIsHandleRequestFeedback(selectedUser);
        const username = localStorage.getItem('user');
        await fetch(`${apiUrl}/api/accept-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({  
                currentUser: username, 
                selectedUser: selectedUser, 
            })
        });
        fetchData();
        //user feedback to let them know there request is being processed
        setIsHandleRequestFeedback('');
        setIsDisabled(false);
        setRemount(prev => prev + 1);
    };

    async function removeAllMatchRequests() {
        console.log('clicked');
        setIsDisabled(true);
        await fetch(`${authUrl}/api/remove-all-match-requests?username=${localStorage.getItem('user')}`, {
            method: 'DELETE',
            headers: { 'authorization': `bearer: ${sessionStorage.getItem('access token')}` }
        });
        fetchData();
        setIsDisabled(false);
    };

    return(
        <div className={`hidden absolute right-full sm:w-fit top-0 min-h-full h-max border-r bg-zinc-100 shadow-xl sm:group-hover:block`}>
            {/* pop out feature for sent match requests */}
            {text === 'Sent Requests' && 
                <PopOutOptions 
                    array={data.sent}
                    displayProfile={displayProfile}
                    removeMatchRequests={removeMatchRequests}   
                    type='Pending requests'
                    isHandleRequestFeedback={isHandleRequestFeedback}
                    isDisabled={isDisabled}
                    removeAllMatchRequests={removeAllMatchRequests}
                />
            }
            {/* pop out feature for recieved match requests */}
            {text === 'Match Requests' &&   
                <PopOutOptions 
                    array={data.recieved}
                    displayProfile={displayProfile}
                    removeMatchRequests={removeMatchRequests}
                    acceptMatchRequest={acceptMatchRequest}
                    type='Match requests'
                    isHandleRequestFeedback={isHandleRequestFeedback}
                    isDisabled={isDisabled}
                />
            }
            {/* pop out feature for viewing current matches */}
            {text === 'Matches' && 
                <PopOutOptions 
                    array={data}
                    displayProfile={displayProfile}
                    type='Matches'
                    isHandleRequestFeedback={isHandleRequestFeedback}
                />
            }
        </div>
    );
};

export default ProfileDropDownSidePopOut;