import { useState, useEffect } from 'react';
 
function ProfileCardFooter({ fetchRequests, requests, city, availability, sendMatchRequest, username }) {
    const [isRequested, setIsRequested] = useState(false);

    useEffect(() => {
        const isAlreadyRequested = requests?.sent.some(el => el === username);
        setIsRequested(isAlreadyRequested);
    }, [username]);

    function handleClick() {
        //Passed the match request function inside of the state because I can't figure out how to update the state immediately.
        //Don't know if this is okay.
        const newState = !isRequested;
        setIsRequested(newState);
        sendMatchRequest(newState);
    };

    return(
        <footer id="card-footer" className="flex justify-between w-full items-center pl-2.5 bg-stone-900">
            <p>City: {city}</p>
            <p>Avalaibility: {availability}</p>
            <button 
                className={`w-1/5 p-1 ${isRequested ? 'bg-green-500 hover:bg-green-900' : 'bg-stone-500 hover:bg-stone-950'}  hover:bg-stone-950 hover:text-stone-500`}
                onClick={() => handleClick()}
            >
                {isRequested ? 'Undo request' : 'Request match'}
            </button>
        </footer>
    );
};

export default ProfileCardFooter;