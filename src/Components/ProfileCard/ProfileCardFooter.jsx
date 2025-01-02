import { useState, useEffect } from 'react';
 
function ProfileCardFooter({ 
    fetchRequests, 
    requests, 
    city, 
    availability, 
    sendMatchRequest, 
    username 
}) {
    const [requested, setRequested] = useState(false);

    function handleClick() {
        //Passed the match request function inside of the state because I can't figure out how to update the state immediately.
        //Don't know if this is okay.
        const newState = !requested;
        setRequested(newState);
        sendMatchRequest(newState);
        fetchRequests(requested);
    };
    useEffect(() => {
        let newState = false;
        for(const item of requests?.sent) {
            
            if(item === username) {
                newState = true;
            };
        };
        setRequested(newState);
    }, []);

    return(
        <footer id="card-footer" className="flex justify-between w-full items-center pl-2.5 bg-stone-900">
            <p>City: {city}</p>
            <p>Avalaibility: {availability}</p>
            <button 
                className={`w-1/5 p-1 ${requested ? 'bg-green-500 hover:bg-green-900' : 'bg-stone-500 hover:bg-stone-950'}  hover:bg-stone-950 hover:text-stone-500`}
                onClick={() => handleClick()}
            >
                {requested ? 'Undo request' : 'Request match'}
            </button>
        </footer>
    );
};

export default ProfileCardFooter;