import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';
import Button from '../../commonComponents/Button.jsx';
import Input from '../../commonComponents/form/Input.jsx';
import MapData from '../../features/methods/MapData.jsx';
import { Facebook, LinkedIn, Twitter } from '../../commonComponents/SVGs.jsx';

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

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsSettings(false);
        };
    };

    useEffect(() => {
        console.log('platform: ', platform);
    }, [platform]);

    //close settings modal when clicked outside of it
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

    function handleSetPlatform(e, platform) {
        e.preventDefault();
        setPlatform(platform);
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
                            placeholder={`enter you ${platform} link`}
                            value={newUserVal}
                            type='text'
                        />
                        <div className='flex gap-2.5 ml-2.5'>
                            <MapData
                                data={platforms}
                                render={(item) => {
                                    const [isHovered, setIsHovered] = useState(false);

                                    let svg;

                                    //assign appropriate svg to each platform icon
                                    if(item === 'facebook') {
                                        svg = <Facebook isHovered={isHovered} />;
                                    } else if(item === 'twitter') {
                                        svg = <Twitter isHovered={isHovered} />;
                                    } else if(item === 'linkedIn') {
                                        svg = <LinkedIn isHovered={isHovered} />;
                                    };

                                    return(
                                        <Button 
                                            key={item}
                                            text={svg}
                                            handleOnMouseOver={() => setIsHovered(true)}
                                            handleOnMouseLeave={() => setIsHovered(false)}
                                            handleOnClick={(e) => handleSetPlatform(e, item)}
                                            isHandleHover={true}
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