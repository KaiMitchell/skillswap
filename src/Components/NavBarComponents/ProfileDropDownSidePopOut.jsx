import { useState, useEffect } from "react";
import { ProfileDropDownSidePopOutRequests } from "./ProfileDropDownSidePopOutOptions";

function ProfileDropDownSidePopOut({ skills, sentRequests, fetchSentRequests, text }) {
    const [isUpdated, setIsUpdated] = useState(false);

    async function removeMatchRequests(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        const data = await response.json();
        fetchSentRequests();
    };

    return(
        <div className={`group-hover:block hidden absolute right-full w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            {text === 'Requests' && <ProfileDropDownSidePopOutRequests 
                                        sentRequests={sentRequests} 
                                        fetchSentRequests={fetchSentRequests} 
                                        removeMatchRequests={removeMatchRequests}/>}
            {/* {text === 'Matches' && <ProfileDropDownSidePopOutRequests 
                                        fetchSentRequests={fetchMatches}/>} */}
        </div>
    );
};

export default ProfileDropDownSidePopOut;