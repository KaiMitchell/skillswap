import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TokenContext } from '../App';
import Input from '../commonComponents/form/Input';
import handleClientSideValidation from '../jsFunctions/handleClientSideValidation';
import Button from '../commonComponents/Button';
import Loading from '../commonComponents/Loading';

function SignUp({ 
    setNewUserData, 
    newUserData, 
    setUser,
    setIsLandingPage,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setAccessToken } = useContext(TokenContext);

    const navigate = useNavigate();

    useEffect(() => {setIsLandingPage(false)}, []);

    //handle input values
    function handleChangeInput(e, type) {

        //only reset invalidation errors for the nput that has changed
        setErrors(prev => ({ 
            ...prev,
            [type]: ''
        }));
        
        setNewUserData(prev => ({
            ...prev,
            [type]: e.target.value
        }));

    };

    //submit registration form
    async function handleRegister(e) {
        e.preventDefault();

        setIsLoading(true);

        //initialize object to store invalid input values
        const newErrors = {};

        handleClientSideValidation({
            username: newUserData.username || null,
            email: newUserData.email || null,
            password: newUserData.password || null,
            confirmPassword: newUserData.confirmPassword || null,
            newErrors
        });

        //client-side validation check
        if(Object.keys(newErrors).length) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        };

        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/register`, {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newUserData)
        });

        const data = await response.json();

        //server side validation / confliction check
        if(response.status === 409) {
            setErrors(data.newErrors);
            setIsLoading(false);
            return;
        };

        localStorage.setItem('user', data.username);
        sessionStorage.setItem('access token', data.accessToken);
        setUser(localStorage.getItem('user'));
        //apply access token
        setAccessToken(() => sessionStorage.getItem('access token'));

        setIsLoading(false);

        //navigate to initial skill pick page
        navigate('/pick-skills');
    };

    return(
        <div className='relative h-screen flex justify-center items-center'>
            {isLoading && <Loading feedBack='Please wait' />}
            <form className='flex flex-col gap-5 p-5 rounded bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700'>
                <h1 className='text-xl font-bold'>Sign up</h1>
                <Input 
                    label='Enter your email'
                    name='email'
                    type='email'
                    id='email'
                    value={newUserData.email}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    error={errors.email || null}
                />
                <Input 
                    label='Create a username'
                    name='username'
                    type='text'
                    id='username'
                    value={newUserData.username}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    error={errors.username || null}
                />
                <Input 
                    label='Create a password'
                    name='password'
                    type='password'
                    id='password'
                    value={newUserData.password}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    error={errors.password || null}
                />
                <Input 
                    label='Confirm your password'
                    name='confirmPassword'
                    type='password'
                    id='confirmPasswod'
                    value={newUserData.confirmPassword}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                    error={errors.confirmPassword || null}
                />
                <p>Already have an account? <Link to="/sign-in" className="text-blue-400">click here</Link></p>
                <Button 
                    isDisabled={isLoading}
                    text='Create'
                    handleOnClick={handleRegister}
                    styles={`px-5 py-2.5 bg-white hover:bg-white/90 rounded`}
                />
            </form>
        </div>
    );
};

export default SignUp;