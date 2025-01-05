import { useState, useEffect } from 'react';
 
function CardFooter({ 
    fetchRequests, 
    city, 
    availability, 
    skills,
    sendMatchRequest, 
}) {
    const [requested, setRequested] = useState(false);

    const buttonHoverBg = {
        matchRequest: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
    };
    let skill;

    if(Array.isArray(skills) && skills.length > 0) {
        skill = skills[0];
    } else {
        skill = skills;
    };

    function handleClick() {
        //Passed the match request function inside of the state because I can't figure out how to update the state immediately.
        //Don't know if this is okay.
        const newState = !requested;
        setRequested(newState);
        sendMatchRequest(newState);
        fetchRequests(requested);
    };

    //TODO: Use the isRequested state to display a loading icon or something to show data is being fetched

    return(
        <footer id="card-footer" className="relative flex justify-between w-full items-center rounded-b-lg bg-zinc-300">
            <h3 className="px-2.5 font-bold text-xl rounded-bl-lg">
                {skill}
            </h3>
            <button 
                className={`w-1/5 p-1 hover:${buttonHoverBg.matchRequest} hover:text-white rounded-br-lg hover:bg-stone-950 hover:text-stone-500`}
                onClick={() => handleClick()}
            >
                Match
            </button>
        </footer>
    );
};

export default CardFooter;