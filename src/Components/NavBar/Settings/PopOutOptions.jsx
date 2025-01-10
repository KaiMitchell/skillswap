import RequestHander from "./Components/RequestHandler";

function PopOutOptions({ 
    array, 
    removeMatchRequests, 
    acceptMatchRequest, 
    displayProfile,
    type
}) {
    return(
        <>
            <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
            {Array.isArray(array) && array?.length ? 
                array?.map(item => {
                    //On last item give padding to prevent mouse from leaving div due to 
                    //item being removed
                    return(
                        <li 
                            key={item}
                            className={`flex items-center justify-between p-2.5 border-b border-stone-900 text-sm text-stone-500 hover:text-stone-400 hadow-xl shadow-black`}
                        >
                            {/* text renderring for sent & recieved requests */}
                            {removeMatchRequests && <p>{!acceptMatchRequest && 'pending'} {item}</p>}
                            {displayProfile && 
                                <p 
                                    onClick={() => displayProfile(item)}
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
                }) 
            : 
                <p className='p-2.5 text-sm text-stone-500'>No pending requests</p>
            }
        </>
    );
};
//side pop out for sent match requests
function SentRequests({ data, removeMatchRequests }) {
    return(
        <ul className="text-nowrap">
            {<PopOutOptions 
                array={data.sent} 
                removeMatchRequests={removeMatchRequests} 
                type='Pending matches'
            />}
        </ul>
    );
};
//side pop out for recieved match requests
function RecievedRequests({ data, removeMatchRequests, acceptMatchRequest }) {
    return(
        <ul className="text-nowrap">
            {<PopOutOptions 
                array={data.recieved} 
                acceptMatchRequest={acceptMatchRequest} 
                removeMatchRequests={removeMatchRequests} 
                type='Match Requests'
            />}
        </ul>
    );
};

function Matches({ 
    data, 
    displayProfile,
    teachProfiles,
    learnProfiles 
}) {
    return(
        <ul className="text-nowrap">
            {<PopOutOptions 
                array={data} 
                type='Matches'
                displayProfile={displayProfile}
                teachProfiles={teachProfiles}
                learnProfiles={learnProfiles}
            />}
    </ul>
    );
};

export {
    SentRequests,
    RecievedRequests,
    Matches
};