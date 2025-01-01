

function ProfileDropDownSidePopOut({ sentRequests }) {
    return(
        <div className={`group-hover:block hidden absolute -left-full w-full top-0 h-max size-10 bg-blue-500`}>
            <h3 className={``}>Current requests</h3>
            <ul>
                {sentRequests?.sent_requests.map(request => {
                    return(
                        <li key={request} className='text-sm p-2.5'>
                            Pending: {request}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProfileDropDownSidePopOut;