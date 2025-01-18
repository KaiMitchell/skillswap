import PopOutOptions from "./PopOutOptions";
import { TokenContext } from "../../../App";
import { useState } from "react";

function ProfileDropDownSidePopOut({ 
    displayProfile,
    data, 
    fetchData, 
    text,
}) {
    const [isHandleRequestFeedback, setIsHandleRequestFeedback] = useState(false);

    //extract token from Context property
    const accessToken = TokenContext.accessToken;
    
    //remove a pending match request you sent
    async function removeMatchRequests(selectedUser) {
        setIsHandleRequestFeedback(true);

        const username = localStorage.getItem('user');

        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "authorization": `Bearer ${accessToken}`
             },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });

        const data = await response.json();

        console.log(data);
        fetchData();
        setIsHandleRequestFeedback(false);
    };

    //accept a match request sent to user
    async function acceptMatchRequest(selectedUser) {
        setIsHandleRequestFeedback(true);

        const username = localStorage.getItem('user');

        const response = await fetch(`http://localhost:3000/accept-match-request`, {
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

        const data = await response.json();
        
        fetchData(selectedUser);
        setIsHandleRequestFeedback(false);
    };

    return(
        <div className={`group-hover:block hidden absolute right-full w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            {/* pop out feature for sent match requests */}
            {text === 'Sent Requests' && 
                <PopOutOptions 
                    array={data.sent}
                    displayProfile={displayProfile}
                    removeMatchRequests={removeMatchRequests}   
                    type='Pending requests'
                    isHandleRequestFeedback={isHandleRequestFeedback}
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