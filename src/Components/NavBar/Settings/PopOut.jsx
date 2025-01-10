import { useContext } from "react";
import { SentRequests, RecievedRequests, Matches } from "./PopOutOptions";
import { TokenContext } from "../../../App";

function ProfileDropDownSidePopOut({ 
    displayProfile,
    data, 
    fetchData, 
    text,
}) {
    //extract token from Context property
    const accessToken = TokenContext.accessToken;
    
    //remove a request you sent
    async function removeMatchRequests(selectedUser) {
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
    };

    //accept a request sent to you
    async function acceptMatchRequest(selectedUser) {
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
        console.log('data: ', data);
        fetchData(selectedUser);
    };
    return(
        <div className={`group-hover:block hidden absolute right-full w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            {text === 'Sent Requests' && 
                <SentRequests 
                    data={data} 
                    removeMatchRequests={removeMatchRequests}
                    displayProfile={displayProfile}
                />
            }
            {text === 'Match Requests' &&   
                <RecievedRequests 
                    data={data} 
                    acceptMatchRequest={acceptMatchRequest}
                    removeMatchRequests={removeMatchRequests}
                    displayProfile={displayProfile}

                />
            }
            {text === 'Matches' && 
                <Matches 
                    data={data} 
                    displayProfile={displayProfile}
                />
            }
        </div>
    );
};

export default ProfileDropDownSidePopOut;