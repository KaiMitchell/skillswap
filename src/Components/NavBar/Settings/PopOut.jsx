import { useContext } from "react";
import PopOutOptions from "./PopOutOptions";
import { TokenContext } from "../../../App";

function ProfileDropDownSidePopOut({ 
    displayProfile,
    data, 
    fetchData, 
    text,
}) {
    //extract token from Context property
    const accessToken = TokenContext.accessToken;
    
    //remove a pending match request you sent
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

    //accept a match request sent to user
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
            {/* pop out feature for sent match requests */}
            {text === 'Sent Requests' && 
                <PopOutOptions 
                    array={data.sent}
                    displayProfile={displayProfile}
                    removeMatchRequests={removeMatchRequests}   
                    type='Pending requests'
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
                />
            }
            {/* pop out feature for viewing current matches */}
            {text === 'Matches' && 
                <PopOutOptions 
                    array={data}
                    displayProfile={displayProfile}
                    type='Matches'
                />
            }
        </div>
    );
};

export default ProfileDropDownSidePopOut;