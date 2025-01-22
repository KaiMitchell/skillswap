import { useState } from "react";
import { TokenContext } from "../App.jsx";
import PopOutOptions from "../Components/NavBar/Settings/PopOutOptions.jsx";
import Button from "./Button.jsx";

function MobileDropdownModal({ 
    mobileDropDown, 
    setMobileDropdown,
    fetchData,
    data,
    text,
    skills,
    displayProfile,
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

        await fetch(`http://localhost:3000/handle-match-request`, {
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

        await fetch(`http://localhost:3000/accept-match-request`, {
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
        await fetch(`http://localhost:4000/remove-all-match-requests?username=${localStorage.getItem('user')}`, {
            method: 'DELETE',
            headers: { 'authorization': `bearer: ${sessionStorage.getItem('access token')}` }
        });
        fetchData();
        setIsDisabled(false);
    };

    return(
        <div 
            className={`sm:hidden absolute top-0 left-1/2 transform -translate-x-1/2 h-5/6 w-full z-20 p2.5 rounded bg-stone-950 shadow-black overflow-y-scroll no-scrollbar`}
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