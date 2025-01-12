import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';
import Button from '../../commonComponents/Button.jsx';

function SettingsModal({ isSettings, setIsSettings }) {    
    //although username and profile pic are locally stored. 
    //use state to update the ui efficiently
    const [newUserVal, setNewUserVal] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [img, setImg] = useState(localStorage.getItem('profile picture') || '');
    const [conflictMessage, setConflictMessage] = useState('');

    const node = useRef();
    const fileRef = useRef();

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsSettings(false);
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    //submit updated profile pic, description or username
    async function handleSubmit(e) {

        e.preventDefault();

        const formData = new FormData();

        if(fileRef.current?.files.length > 0) {

            formData.append('imgFile', fileRef.current.files[0]);

        };

        formData.append('currentUsername', localStorage.getItem('user'));
        formData.append('newUsername', newUserVal);
        formData.append('newDescription', newDescription);

        const response = await fetch(`http://localhost:4000/edit-profile`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
            },
            body: formData
        });

        const data = await response.json();

        if(response.status === 409) {

            setConflictMessage(data.message);
            //clear input value
            setNewUserVal('');
            return;

        };

        //ensure old image is not removed with no new image to replace it
        if(data.img) {

            setImg(data.img);
            localStorage.setItem('profile picture', data.img);

        };

        //if response sends a valid username then store it in local storage
        data.newUsername && localStorage.setItem('user', data.newUsername);

        setNewUsername(localStorage.getItem('user'));
        //clear input values and reset conflict prompt
        setNewDescription('');
        setNewUserVal('');
        setConflictMessage('');
        fileRef.current.value = '';

    };

    const handlenewUserOnChange = (currentVal) => {

        setConflictMessage('');
        setNewUserVal(currentVal);
        
    };

    return(
        <div ref={node} className={`${isSettings ? 'block' : 'hidden'} fixed size-10/12 m-auto z-20 top-0 bottom-0 left-0 right-0 px-10 py-5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar`}>
            <div className='w-full min-h-1/4 flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                <form className='flex flex-col gap-5 w-full lg:w-1/2'>
                    <div>
                        <label className='font-bold'>Update profile picture</label>
                        <input 
                            ref={fileRef}
                            type="file" 
                            name='fileInput' 
                            className='p-1 border border-black rounded'
                        />
                    </div>
                    <div>
                        <label className='font-bold'>Change your username</label> <br />
                        <input 
                            value={newUserVal}
                            onChange={(e) => handlenewUserOnChange(e.target.value)}
                            type="text" 
                            className='p-1 border border-black rounded'
                        />
                    </div>
                    {conflictMessage && <p className='text-xs text-red-500'>{conflictMessage}</p>}                   
                    <div>
                        <label className='font-bold'>Update Description</label>
                        <textarea 
                            value={newDescription} 
                            onChange={(e) => setNewDescription(e.target.value)} 
                            rows='5' 
                            className='w-full'
                        />
                    </div>
                    <Button 
                        handleOnClick={handleSubmit}
                        text={'Submit'}
                        styles={`w-1/3 px-2.5 py-1 border border-black rounded cursor-pointer`}
                    />
                </form>
                {/* image */}
                <div className='flex flex-col gap-2.5 items-center'>
                    <img 
                        src={img}
                        alt='profile'
                        className="rounded-full size-80 border-solid border border-slate-500"
                    />
                    <h3 className='text-xl font-bold'>{newUsername || localStorage.getItem('user')}</h3>
                </div>
            </div>
            <div className='flex flex-col gap-10 h-fit w-full'>
                <SkillsManagementComponent />
            </div>
        </div>
    );
};

export default SettingsModal;