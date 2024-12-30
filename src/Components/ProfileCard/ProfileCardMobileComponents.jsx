const placeholder = [];
for(let i = 0; i < 3; i++) {
    placeholder.push(`skill${i + 1}`);
};

function ProfileCardMobileComponents({ username, skills }) {
    return(
        <div className='block h-full min-w-1/2 flex flex-col justify-between ml-2.5'>
            <ul>
                <p className='text-xl font-bold'>To learn:</p>
                {skills.map(skill => <li className='ml-2.5' key={skill}>{skill}</li>)}
            </ul>
            <ul>
                <p className='text-xl font-bold'>To Teach:</p>
                {placeholder.map(el => <li className='ml-2.5' key={el}>{el}</li>)}
            </ul>
        </div>
    );
};

export default ProfileCardMobileComponents;