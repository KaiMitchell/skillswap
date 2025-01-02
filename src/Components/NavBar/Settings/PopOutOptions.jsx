function ProfileDropDownSidePopOutOptions({ array, removeMatchRequests, acceptMatchRequest, type, isAcceptButton }) {
    return(
        <>
            <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
            {Array.isArray(array) && array.length ? 
                array.map(item => {
                    //On last item give padding to prevent mouse from leaving div due to 
                    //item being removed
                    return(
                        <li 
                            key={item}
                            className={`flex items-center justify-between p-2.5 border-b border-stone-900 text-sm text-stone-500 hover:text-stone-400 hadow-xl shadow-black`}
                        >
                            <p>{!isAcceptButton && 'pending'} {item}</p>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => removeMatchRequests(item)}
                                    className={`text-xl text-red-400 hover:text-red-600 cursor-pointer`}>
                                    ❌
                                </button>
                                {isAcceptButton && 
                                    <button 
                                        onClick={() => acceptMatchRequest(item)}
                                        className={`hover:bg-green-600 cursor-pointer`}>
                                        ✅
                                    </button>
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
function SentRequests({ requests, removeMatchRequests }) {
    return(
        <ul className="text-nowrap">
            {<ProfileDropDownSidePopOutOptions 
                array={requests.sent} 
                removeMatchRequests={removeMatchRequests} 
                type='Pending matches'
            />}
        </ul>
    );
};
//side pop out for recieved match requests
function RecievedRequests({ requests, removeMatchRequests, acceptMatchRequest }) {
    return(
        <ul className="text-nowrap">
            {<ProfileDropDownSidePopOutOptions 
                array={requests.recieved} 
                acceptMatchRequest={acceptMatchRequest} 
                removeMatchRequests={removeMatchRequests} 
                isAcceptButton={true}
                type='Match Requests'
            />}
        </ul>
    );
};

export {
    SentRequests,
    RecievedRequests
};