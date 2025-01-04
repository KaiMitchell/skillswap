import { SentRequests, RecievedRequests, Matches } from "./PopOutOptions";

function ProfileDropDownSidePopOut({ setIsDisplayMatch, data, fetchData, text }) {
    //remove a request you sent
    async function removeMatchRequests(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        const data = await response.json();
        fetchData();
    };

    //accept a request sent to you
    async function acceptMatchRequest(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/accept-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  
                currentUser: username, 
                selectedUser: selectedUser, 
            })
        });
        const data = await response.json();
        console.log('data: ', data);
        fetchData();
    };

    async function displayProfile(username) {
        setIsDisplayMatch(true);
        const response = await fetch(`http://localhost:3000/profile?user=${username}`);
        const data = await response.json();
        const profileData = data.profileData;
        console.log(profileData);
        // setIsProfileDisplayed(true);
    };

    return(
        <div className={`group-hover:block hidden absolute right-full w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            {text === 'Sent Requests' && 
                <SentRequests 
                    data={data} 
                    removeMatchRequests={removeMatchRequests}
                />
            }
            {text === 'Match Requests' && 
                <RecievedRequests 
                    data={data} 
                    acceptMatchRequest={acceptMatchRequest}
                    removeMatchRequests={removeMatchRequests}
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