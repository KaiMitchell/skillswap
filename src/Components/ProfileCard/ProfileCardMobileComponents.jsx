const placeholder = [];
for(let i = 0; i < 3; i++) {
    placeholder.push(`skill${i + 1}`);
};

function ProfileCardMobileComponents({ username, skill }) {
    return(
        <div className='sm:hidden block h-full flex flex-col justify-between ml-2.5'>
            <h3 className='text-2xl font-bold'>{username}</h3>
            <ul>
                <p className='text-xl font-bold'>To learn:</p>
                {placeholder.map(el => <li className='ml-2.5' key={el}>{el}</li>)}
            </ul>
            <ul>
                <p className='text-xl font-bold'>To Teach:</p>
                {placeholder.map(el => <li className='ml-2.5' key={el}>{el}</li>)}
            </ul>
        </div>
    );
};

export default ProfileCardMobileComponents;