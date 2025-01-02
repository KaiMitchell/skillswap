import { useState, useEffect } from "react";
import { ProfileDropDownSidePopOutSentRequests, ProfileDropDownSidePopOutRecievedRequests } from "./ProfileDropDownSidePopOutOptions";

function ProfileDropDownSidePopOut({ skills, requests, fetchRequests, text }) {
    //remove a request you sent
    async function removeMatchRequests(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        const data = await response.json();
        fetchRequests();
    };
    //accept a request sent to you
    async function acceptMatchRequest(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isAccepted: true })
        });
        const data = await response.json();
        console.log(data);
        // fetchRequests();
    };

    return(
        <div className={`group-hover:block hidden absolute right-full w-fit top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            {text === 'Sent Requests' && <ProfileDropDownSidePopOutSentRequests 
                                        requests={requests} 
                                        removeMatchRequests={removeMatchRequests}/>}
            {text === 'Match Requests' && <ProfileDropDownSidePopOutRecievedRequests 
                                        requests={requests} 
                                        acceptMatchRequest={acceptMatchRequest}
                                        removeMatchRequests={removeMatchRequests}/>}
        </div>
    );
};

export default ProfileDropDownSidePopOut;