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

function ProfileDropDownSidePopOutSkillOptions({ skills }) {
    return(
        <div className='min-h-max max-h-80 bg-black w-full text-white rounded overflow-y-auto no-scrollbar shadow-xl shadow-black'>
            <h3 className={`pl-2.5 p-2.5 text-stone-500`}>Add Skills</h3>
            {skills?.map((obj) => {
                return(
                    <div key={obj.category} className='relative'>
                        <h3 className='sticky top-0 p-2.5 text-sm text-stone-400 bg-stone-800'>{obj.category}</h3> 
                        <ul className='bg-red-700'>
                            {obj.skills.map((skill) => {
                                return <li key={skill} className='pl-1 py-2 bg-stone-950 hover:bg-stone-900 text-stone-500 text-sm cursor-pointer'>{skill}</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export {
    ProfileDropDownSidePopOutRequests,
    ProfileDropDownSidePopOutSkillOptions
};