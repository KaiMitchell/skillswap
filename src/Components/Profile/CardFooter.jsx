import { useState, useEffect } from 'react';
 
function CardFooter({ 
    fetchRequests, 
    city, 
    availability, 
    skills,
    sendMatchRequest, 
}) {
    const [requested, setRequested] = useState(false);

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

    return(
        <footer id="card-footer" className="relative flex justify-between w-full items-center rounded-b-lg bg-stone-900">
            <h3 className="px-2.5 font-bold text-xl rounded-bl-lg text-stone-500">
                {skill}
            </h3>
            <button 
                className={`w-1/5 p-1 ${requested ? 'bg-green-500 hover:bg-green-900' : 'bg-stone-500 hover:bg-stone-950'} rounded-br-lg hover:bg-stone-950 hover:text-stone-500`}
                onClick={() => handleClick()}
            >
                {requested ? 'Undo request' : 'Request match'}
            </button>
        </footer>
    );
};

export default CardFooter;