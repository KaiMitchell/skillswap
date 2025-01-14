import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';
import Button from '../../commonComponents/Button.jsx';
import Input from '../../commonComponents/form/Input.jsx';
import MapData from '../../features/methods/MapData.jsx';
import StandardSVG from '../../commonComponents/StandardSVG.jsx';

function SettingsModal({ isSettings, setIsSettings }) {    
    //although username and profile pic are locally stored. 
    //use state to update the ui efficiently
    const [newUserVal, setNewUserVal] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [img, setImg] = useState(localStorage.getItem('profile picture') || '');
    const [conflictMessage, setConflictMessage] = useState('');
    const [platform, setPlatform] = useState('');

    const node = useRef();
    const fileRef = useRef();

    //array of platforms to help select the platforms name and use it
    const platforms = ['facebook', 'twitter', 'linkedIn'];
    const facebookSvgD = 'M21 1.5H3A1.5 1.5 0 0 0 1.5 3v18A1.5 1.5 0 0 0 3 22.5h8.5v-8h-2v-3h2v-2a4 4 0 0 1 4-4h3v3h-3a1 1 0 0 0-1 1v2h4l-.5 3h-3.5v8H21a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 21 1.5Z';
    const twitterSvgD = 'M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z';
    const linkedInD = 'M24.299 23.921v-6.137c0-3.288-1.755-4.818-4.096-4.818-1.889 0-2.735 1.039-3.206 1.768v-1.517h-3.558c.047 1.005 0 10.704 0 10.704h3.558v-5.978c0-.319.023-.639.117-.867.257-.639.842-1.301 1.825-1.301 1.288 0 1.803.981 1.803 2.42v5.727l3.557-.001zM9.69 11.756c1.24 0 2.013-.823 2.013-1.85-.023-1.05-.773-1.849-1.99-1.849s-2.012.799-2.012 1.849c0 1.028.772 1.85 1.967 1.85h.022zm1.779 12.165V13.217H7.912v10.704h3.557z';

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
                    <Input 
                        label='Update profile picture'
                        fileRef={fileRef}
                        name='fileInput'
                        type='file'
                    />
                    <Input 
                        label='Change your username'
                        onChangeHandler={handlenewUserOnChange}
                        value={newUserVal}
                        type='text'
                    />
                    {conflictMessage && <p className='text-xs text-red-500'>{conflictMessage}</p>}   
                    {/* ADD linkes to users social platforms */}
                    <div className='flex items-end'>
                        <Input
                            label='Add social links'
                            onChangeHandler={handlenewUserOnChange}
                            value={newUserVal}
                            type='text'
                        />
                        <div className='flex gap-2.5 ml-2.5'>
                            <MapData
                                data={platforms}
                                render={(item) => {

                                    let d;

                                    //assign appropriate svg attributes to each platform icon
                                    if(item === 'facebook') {
                                        d = facebookSvgD;
                                    } else if(item === 'twitter') {
                                        d = twitterSvgD;
                                    } else if(item === 'linkedIn') {
                                        d = linkedInD;
                                    };

                                    return(
                                        <Button 
                                            key={item}
                                            text={<StandardSVG d={d} />}

                                        />
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <Input
                        label='Update Description'
                        onChangeHandler={setNewDescription}
                        value={newDescription}
                        isTxtArea={true}
                    />  
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