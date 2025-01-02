function ProfileDropDownSidePopOutRequests({ requests, removeMatchRequests }) {
    return(
        <ul className="text-nowrap">
            <h3 className={`pl-2.5 pt-2.5 text-stone-500`}>Current requests</h3>
            {Array.isArray(requests.sent) && requests.sent.length ? 
                requests.sent.map(request => {
                    //On last item give padding to prevent mouse from leaving div due to 
                    //item being removed
                    return(
                        <li 
                            key={request}
                            className={`flex items-center justify-between p-2.5 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-900 shadow-xl shadow-black cursor-pointer`}
                        >
                            <p>pending {request}</p>
                            <button onClick={() => removeMatchRequests(request)}
                                className={`text-xl text-red-400 hover:text-red-200`}>
                                ❌
                            </button>
                        </li>
                    );
                }) 
            : 
                <p className='p-2.5 text-sm text-stone-500'>No pending requests</p>
            }
        </ul>
    );
};

export {
    ProfileDropDownSidePopOutRequests,
};