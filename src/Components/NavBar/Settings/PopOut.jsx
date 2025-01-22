import PopOutOptions from "./PopOutOptions";
import { TokenContext } from "../../../App";
import { useState } from "react";

function ProfileDropDownSidePopOut({ 
    displayProfile,
    data, 
    fetchData, 
    text,
}) {
    const [isHandleRequestFeedback, setIsHandleRequestFeedback] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    //extract token from Context property
    const accessToken = TokenContext.accessToken;
    
    //remove a pending match request you sent
    async function removeMatchRequests(selectedUser) {
        setIsDisabled(true);
        setIsHandleRequestFeedback(selectedUser);

        const username = localStorage.getItem('user');

        await fetch(`http://localhost:3000/api/handle-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
             },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });

        fetchData();
        setIsHandleRequestFeedback(selectedUser);
        setIsDisabled(false);
    };

    //accept a match request sent to user
    async function acceptMatchRequest(selectedUser) {
        setIsDisabled(true);
        setIsHandleRequestFeedback(selectedUser);

        const username = localStorage.getItem('user');

        await fetch(`http://localhost:3000/api/accept-match-request`, {
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
        
        fetchData(selectedUser);
        //user feedback to let them know there request is being processed
        setIsHandleRequestFeedback(selectedUser);
        setIsDisabled(false);
    };

    async function removeAllMatchRequests() {
        setIsDisabled(true);
        await fetch(`http://localhost:4000/api/remove-all-match-requests?username=${localStorage.getItem('user')}`, {
            method: 'DELETE',
            headers: { 'authorization': `bearer: ${sessionStorage.getItem('access token')}` }
        });
        fetchData();
        setIsDisabled(false);
    };

    return(
        <div className={`hidden absolute right-full sm:w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950 sm:group-hover:block`}>
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