import RequestHander from "./Components/RequestHandler";

function PopOutOption({
    displayProfile,
    removeMatchRequests,
    acceptMatchRequest,
    type,
    item
}) {
    return(
        <li 
            key={item}
            className={`flex items-center justify-between p-2.5 border-b border-stone-900 text-sm text-stone-500 hover:text-stone-400 hadow-xl shadow-black`}
        >
            {/* text renderring for sent & recieved requests */}
            {/* {removeMatchRequests && <p>{!acceptMatchRequest && 'pending'}</p>} */}
            {displayProfile && 
                <p 
                    onClick={() => displayProfile(item, type)}
                >
                    {item}
                </p>
            }
            <div className="flex items-center gap-2">
                {removeMatchRequests &&
                    <RequestHander 
                        handler={removeMatchRequests} 
                        item={item}
                        icon='❌'
                    />
                }
                {acceptMatchRequest && 
                    <RequestHander
                        handler={acceptMatchRequest}
                        item={item}
                        icon='✅'
                    />
                }
            </div>
        </li>
    );
};

export default PopOutOption;