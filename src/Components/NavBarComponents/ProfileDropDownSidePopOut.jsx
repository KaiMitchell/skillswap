import { useState } from "react";
import { ProfileDropDownSidePopOutRequests, ProfileDropDownSidePopOutSkillOptions } from "./ProfileDropDownSidePopOutOptions";

function ProfileDropDownSidePopOut({ skills, sentRequests, fetchSentRequests, text }) {

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
            {text === 'Requests' && <ProfileDropDownSidePopOutRequests sentRequests={sentRequests} fetchSentRequests={fetchSentRequests} removeMatchRequests={removeMatchRequests} />}
            {text === 'Add skills to teach' && <ProfileDropDownSidePopOutSkillOptions skills={skills} />}
            {text === 'Add skills to learn' && <ProfileDropDownSidePopOutSkillOptions skills={skills} />}
        </div>
    );
};

export default ProfileDropDownSidePopOut;