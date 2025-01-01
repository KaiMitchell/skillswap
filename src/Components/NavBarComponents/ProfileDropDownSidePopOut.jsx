import { useState } from "react";

function ProfileDropDownSidePopOut({ sentRequests, fetchSentRequests }) {

    async function removeMatchRequests(selectedUser) {
        const username = localStorage.getItem('user');
        const response = await fetch(`http://localhost:3000/handle-match-request`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  currentUser: username, selectedUser: selectedUser, isRequested: false })
        });
        const data = await response.json();
        console.log(data);
        fetchSentRequests();
    };
    return(
        <div className={`group-hover:block hidden absolute -left-full w-full top-0 min-h-full h-max border-r border-stone-900 bg-stone-950`}>
            <h3 className={`pl-2.5 pt-2.5 text-stone-500`}>Current requests</h3>
            <ul>
                {sentRequests?.map(request => {
                    return(
                        <li 
                            key={request}
                            className={`flex items-center justify-between p-2.5 text-sm text-stone-500 ${sentRequests[0] === 'No Requests' ? '' : 'hover:text-stone-400 hover:bg-stone-900'}`}
                        >
                            <p>{sentRequests[0] === 'No Requests' ? '' : 'Pending'} {request}</p>
                            <button 
                                onClick={() => removeMatchRequests(request)}
                                className={`${sentRequests[0] === 'No Requests' ? 'hidden' : 'block'} text-xl text-red-400 hover:text-red-200`}
                            >
                                ❌
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProfileDropDownSidePopOut;