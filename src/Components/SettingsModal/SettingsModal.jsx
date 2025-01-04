import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';

function SettingsModal({ isSettings, setIsSettings }) {    
    const [descriptionValue, setDescriptionValue] = useState('');
    const node = useRef();

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

    return(
        <div ref={node} className={`${isSettings ? 'block' : 'hidden'} fixed size-10/12 m-auto z-20 top-0 bottom-0 left-0 right-0 px-10 py-5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar`}>
            <div className='w-full min-h-1/4 flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                <form className='w-full lg:w-1/2'>
                    <label className='font-bold'>Update profile picture</label><br />
                    <input type="text" className='p-1 border border-r-0 border-black rounded rounded-r-none'/>
                    <button className='px-2.5 py-1 border border-l-0 border-black rounded rounded-l-none'>Update</button>
                    <br />
                    <br />
                    <label className='font-bold'>change username</label><br />
                    <input type="text" className='p-1 border border-r-0 border-black rounded rounded-r-none'/>
                    <button className='px-2.5 py-1 border border-l-0 border-black rounded rounded-l-none'>Change</button>
                    <br />
                    <br />
                    <label className='font-bold'>Describe yourself</label><br />
                    <textarea 
                        value={descriptionValue} 
                        onChange={(e) => setDescriptionValue(e.target.value)} 
                        rows='5' 
                        className='w-full'
                    />
                    <button onClick={(e) => submitDescription(e)} className='px-2.5 py-1 border border-l-0 border-black rounded rounded-l-none'>Change</button>
                </form>
                {/* image */}
                <div className='w-full lg:w-1/3 flex justify-center lg:justify-end items-center'>
                    <div className='min-w-40 min-h-40 bg-black rounded-full self-start flex justify-center items-center text-white'>Image</div>
                </div>
            </div>
            <div className='flex flex-col gap-10 h-fit w-full'>
                <SkillsManagementComponent />
            </div>
        </div>
    );
};

export default SettingsModal;