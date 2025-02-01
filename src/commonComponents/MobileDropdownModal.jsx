import { useState } from "react";
import PopOutOptions from "../Components/NavBar/Settings/PopOutOptions.jsx";

const apiUrl = import.meta.env.VITE_API_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

function MobileDropdownModal({ 
    setMobileDropdown,
    fetchData,
    data,
    text,
    displayProfile,
}) {
    const [isHandleRequestFeedback, setIsHandleRequestFeedback] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    //extract token from Context property
    const accessToken = sessionStorage.getItem('access token');
    
    //remove a pending match request you sent
    async function removeMatchRequests(selectedUser) {
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
        setIsHandleRequestFeedback(selectedUser);
        setIsDisabled(false);
    };

    //accept a match request sent to user
    async function acceptMatchRequest(selectedUser) {
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
        
        fetchData(selectedUser);
        //user feedback to let them know there request is being processed
        setIsHandleRequestFeedback(selectedUser);
        setIsDisabled(false);
    };

    async function removeAllMatchRequests() {
        setIsDisabled(true);
        await fetch(`${authUrl}/api/remove-all-match-requests?username=${localStorage.getItem('user')}`, {
            method: 'DELETE',
            headers: { 'authorization': `bearer: ${sessionStorage.getItem('access token')}` }
        });
        fetchData();
        setIsDisabled(false);
    };

    return(
        <div 
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-5/6 w-full z-20 bg-white p-2.5 rounded overflow-y-scroll no-scrollbar sm:hidden`}
        >
            <div className={``}>
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
                        isMobile={true}
                        setMobileDropdown={setMobileDropdown}
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
                        isMobile={true}
                        setMobileDropdown={setMobileDropdown}
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
                        isMobile={true}
                        setMobileDropdown={setMobileDropdown}
                    />
                }
            </div>
        </div>
    );
};

export default MobileDropdownModal;