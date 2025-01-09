import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';

function SettingsModal({ isSettings, setIsSettings }) {    
    const [newUsername, setNewUsername] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [img, setImg] = useState();

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

    async function submitDescription(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/submit-description`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                username: localStorage.getItem('user'),
                description: descriptionValue
            })
        });
        const data = await response.json();
        console.log(data);
    };


    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imgFile', fileRef.current.files[0]);
        formData.append('newUsername', newUsername);
        formData.append('newDescription', newDescription);
        const response = await fetch(`http://localhost:3000/test-image-upload`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
            },
            body: formData
        });
        const data = await response.json();
        setImg(data.img);
        console.log(data);
    };


    return(
        <div ref={node} className={`${isSettings ? 'block' : 'hidden'} fixed size-10/12 m-auto z-20 top-0 bottom-0 left-0 right-0 px-10 py-5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar`}>
            <div className='w-full min-h-1/4 flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                <form onSubmit={handleSubmit} className='w-full lg:w-1/2'>
                    <label className='font-bold'>Update profile picture</label><br />
                    <input 
                        ref={fileRef}
                        type="file" 
                        name='fileInput' 
                        className='p-1 border border-black rounded'
                    />
                    <br />
                    <br />
                    <label className='font-bold'>Change your username</label><br />
                    <input 
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        type="text" 
                        className='p-1 border border-black rounded'
                    />
                    <br />
                    <br />
                    <label className='font-bold'>Update Description</label><br />
                    <textarea 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                        rows='5' 
                        className='w-full'
                    />
                    <button 
                        type='submit' 
                        className='px-2.5 py-1 border border-black rounded'>
                            Change
                    </button>
                </form>
                {/* image */}
                <img 
                    src={img}
                    alt='profile'
                    className="rounded-full size-80 border-solid border border-slate-500"
                />
            </div>
            <div className='flex flex-col gap-10 h-fit w-full'>
                <SkillsManagementComponent />
            </div>
        </div>
    );
};

export default SettingsModal;