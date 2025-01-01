function ProfileDropDownSidePopOutRequests({ sentRequests, removeMatchRequests }) {
    return(
        <ul>
            <h3 className={`pl-2.5 pt-2.5 text-stone-500`}>Current requests</h3>
            {sentRequests?.map(request => {
                return(
                    <li key={request}
                        className={`flex items-center justify-between p-2.5 text-sm text-stone-500 ${sentRequests[0] === 'No Requests' ? '' : 'hover:text-stone-400 hover:bg-stone-900 shadow-xl shadow-black'}`}>
                        <p>{sentRequests[0] === 'No Requests' ? '' : 'Pending'} {request}</p>
                        <button onClick={() => removeMatchRequests(request)}
                            className={`${sentRequests[0] === 'No Requests' ? 'hidden' : 'block'} text-xl text-red-400 hover:text-red-200`}>
                            ❌
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export {
    ProfileDropDownSidePopOutRequests,
};