import { useEffect, useRef, useState } from 'react';
import SkillsManagementComponent from './SkillsManagementComponent.jsx';
import Button from '../../commonComponents/Button.jsx';
import Input from '../../commonComponents/form/Input.jsx';
import MapData from '../../features/methods/MapData.jsx';
import { Facebook, LinkedIn, Revert, Twitter } from '../../commonComponents/SVGs.jsx';
import Loading from '../../commonComponents/Loading.jsx';

function SettingsModal({ isSettings, setIsSettings }) {    
    const [isUpdating, setIsUpdating] = useState(false);
    //although username and profile pic are locally stored. 
    //use state to update the ui efficiently
    const [newUserVal, setNewUserVal] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [img, setImg] = useState(localStorage.getItem('profile picture') || '');
    const [conflictMessage, setConflictMessage] = useState('');
    const [platform, setPlatform] = useState('');
    const [platformLink, setPlatformLink] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const node = useRef();
    const fileRef = useRef();

    //array of platforms to help select the platforms name and use it
    const platforms = ['facebook', 'twitter', 'linkedIn'];

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsSettings(false);
        };
    };

    //close settings modal when clicked outside of it
    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    //submit updated profile pic, description or username
    async function handleSubmit(e) {
        e.preventDefault();

        setIsUpdating(true);

        const formData = new FormData();

        if(fileRef.current?.files.length > 0) {
            formData.append('imgFile', fileRef.current.files[0]);               
        };

        formData.append('currentUsername', localStorage.getItem('user'));
        formData.append('newUsername', newUserVal);
        formData.append('newDescription', newDescription);
        formData.append('linkToPlatform', platformLink);
        formData.append('platform', platform.toLowerCase());

        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/edit-profile`, {
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
            localStorage.setItem('profile picture', data.img);
            console.log(data.img);
            setImg(() => data.img);
        };
            
        //if response sends a valid username then store it in local storage
        data.newUsername && localStorage.setItem('user', data.newUsername);

        setNewUsername(localStorage.getItem('user'));
        //clear input values and reset conflict prompt                           
        setNewDescription('');
        setPlatform('');
        setPlatformLink('');
        setNewUserVal('');
        setConflictMessage('');
        setIsUpdating(false);
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
        <div 
            ref={node} 
            className={`fixed m-auto z-20 top-0 bottom-0 left-0 right-0 size-full px-5 py-5 bg-stone-100 shadow-xl shadow-black sm:size-10/12 sm:px-10 overflow-y-scroll no-scrollbar sm:rounded`}
        >
            <div className={`h-full w-full relative`}>
                <Button 
                    text={<Revert isHovered={isHovered} />}
                    handleOnClick={() => setIsSettings(false)}
                    handleOnMouseOver={() => setIsHovered(true)}
                    handleOnMouseLeave={() => setIsHovered(false)}
                    styles={`fixed top-0 right-0 z-20 p-2.5 text-white backdrop-blur-sm bg-black/30 sm:rounded-bl sm:absolute sm:-top-5 sm:-right-10`}
                />
                <div className={`relative w-full min-h-full`}>
                    {isUpdating && <Loading feedBack='Updating' />}
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
                            <div className='flex flex-col gap-2.5 items-center sm:flex-row sm:items-end'>
                                <Input
                                    label='Add social links'
                                    onChangeHandler={setPlatformLink}
                                    placeholder={`enter you ${platform} link`}
                                    value={platformLink}
                                    type='text'
                                />
                                <div className='flex gap-2.5 flex-row sm:ml-2.5'>
                                    <MapData
                                        data={platforms}
                                        render={(platform) => {
                                            const [isHovered, setIsHovered] = useState(false);

                                            let svg;

                                            //assign appropriate svg to each platform icon
                                            if(platform === 'facebook') {
                                                svg = <Facebook isHovered={isHovered} />;
                                            } else if(platform === 'twitter') {
                                                svg = <Twitter isHovered={isHovered} />;
                                            } else if(platform === 'linkedIn') {
                                                svg = <LinkedIn isHovered={isHovered} />;
                                            };

                                            return(
                                                <Button 
                                                    key={platform}
                                                    text={svg}
                                                    handleOnMouseOver={() => setIsHovered(true)}
                                                    handleOnMouseLeave={() => setIsHovered(false)}
                                                    handleOnClick={(e) => handleSetPlatform(e, platform)}
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
                                isDisabled={isUpdating}
                                text={'Submit'}
                                styles={`${isUpdating && 'bg-black/10'} px-2.5 py-1 w-full self-center border border-black rounded hover:bg-black/10 sm:w-1/3`}
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
                        <SkillsManagementComponent 
                            setIsUpdating={setIsUpdating}
                            isUpdating={isUpdating}
                            isSettings={isSettings}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;