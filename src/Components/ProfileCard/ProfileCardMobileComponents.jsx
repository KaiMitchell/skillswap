const placeholder = [];
for(let i = 0; i < 3; i++) {
    placeholder.push(`skill${i + 1}`);
};

function ProfileCardMobileComponents({ username, skills }) {
    return(
        <div className='relative h-full w-full flex flex-col justify-between'>
            <div className="h-1/3">
                <p className='ml-2.5 text-xl font-bold'>To learn:</p>
                <ul className='h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar'>
                    {skills.map(skill => <li className='text-xs' key={skill}>{skill}</li>)}
                </ul>
            </div>
            <div className="h-1/3">
                <p className='ml-2.5 pb-0 text-large font-bold'>To teach:</p>
                <ul className='h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar'>
                    {skills.map(skill => <li className='text-xs' key={skill}>{skill}</li>)}
                </ul>
            </div>
            <button className='w-1/2 self-center text-sm bg-stone-950 text-stone-300 cursor-pointer'>
                    show all skills
            </button>
        </div>
    );
};

export default ProfileCardMobileComponents;