import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleClientSideValidation from '../jsFunctions/handleClientSideValidation.js';
import Input from '../commonComponents/form/Input.jsx';
import broke from '../assets/broke.jpg';  

const deployedImgUrl = 'https://res.cloudinary.com/dmxg3taha/image/upload/';

function SignIn({ 
    setUser, 
    setIsLandingPage,
}) {
    const [errors, setErrors] = useState({});
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
    });

    const navigate = new useNavigate();

    useEffect(() => {
        setIsLandingPage(false);
    }, []);

    //update state based on each input fields value
    function handleChangeInput(e, type) {
        //only reset invalidation errors for the nput that has changed
        setErrors(prev => ({ 
            ...prev,
            [type]: ''
        }));
        setUserDetails(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    async function signIn(e) {
        e.preventDefault();
        //trim each input value
        for(const key in userDetails) {
            if(key === 'username') {
                userDetails[key] = userDetails[key].trim(); 
            };
        };
        //initialize object to store invalid error values
        let newErrors = {};
        handleClientSideValidation({
            username: userDetails.username || null,
            password: userDetails.password || null,
            isSignIn: true,
            newErrors
        });
        //client-side validtion
        if(Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        };
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // credentials: 'include',
            body: JSON.stringify(userDetails)
        });
        const data = await response.json();
        if(response.status === 401) {
            setErrors(data.newErrors);
            console.log(data.newErrors);
            return;
        };
        if(response.status === 200) {
            localStorage.setItem("user", userDetails.username);
            setUser(() => userDetails.username);
            localStorage.setItem('profile picture', deployedImgUrl + data.profile_picture);
            sessionStorage.setItem('access token', data.accessToken);
        };
        navigate('/');
    };

    function clearForm() {
        setUserDetails(prev => {
            const newObj = {};
            Object.keys(prev).forEach((key) => newObj[key] = '');
            return newObj;
        });
    };

    return(
        <div 
            style={{ 
                backgroundImage: `url(${broke})`,
                backgroundSize: 'cover',
            }}
            className='h-screen flex justify-center items-center'
        >
            <form className='flex flex-col gap-5 w-fit p-5 rounded bg-white/10 backdrop-blur-sm'>
                <h1 className='text-xl font-bold'>Sign in</h1>
                <Input 
                    label='Enter your username'
                    type='text'
                    value={userDetails.username}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    name='username'
                    error={errors.username || null}
                />
                <Input 
                    label='Enter your password'
                    name='password'
                    type='password'
                    value={userDetails.password}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    error={errors.password || null}
                />
                <p>Don't have an account? <Link to="/register" className='text-blue-400'>click here</Link></p>
                <Link>Forgot password?</Link>
                {/* Why do I need to neg the mt? */}
                <button onClick={(e) => {clearForm(), signIn(e)}} className='px-5 py-2.5 bg-white hover:bg-white/90 rounded'>Sign in</button>
            </form>
        </div>
    );
};

export default SignIn;