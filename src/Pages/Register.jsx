import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TokenContext } from '../App';
import Input from '../commonComponents/form/Input';
import Button from '../commonComponents/Button';

const PORT = 4000;

function SignUp({ setNewUserData, newUserData }) {
    const { setAccessToken } = useContext(TokenContext);

    function handleChangeInput(e, type) {
            setNewUserData(prev => ({
                ...prev,
                [type]: e.target.value
        }));
    };

    async function handleRegister() {
        const response = await fetch(`http://localhost:${PORT}/register`, {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newUserData)
        });
        const data = await response.json();
        sessionStorage.setItem('access token', data.accessToken);
        setAccessToken(() => sessionStorage.getItem('access token'));
    };

    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto p-5 border'>
                <h1 className='text-xl font-bold'>Sign up</h1>
                <Input 
                    label='Enter your email'
                    name='email'
                    type='text'
                    value={newUserData.email}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                />
                <Input 
                    label='Create a username'
                    name='username'
                    type='text'
                    value={newUserData.username}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                />
                <Input 
                    label='Create a password'
                    name='password'
                    type='password'
                    value={newUserData.password}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                />
                <Input 
                    label='Confirm your password'
                    name='confirmPassword'
                    type='password'
                    value={newUserData.confirmPassword}
                    onChangeHandler={handleChangeInput}
                    isSigninOrRegister={true}
                />
                <p>Already have an account? <Link to="/sign-in" className="text-blue-400">click here</Link></p>
                <Link to="/pick-skills" className='self-end'>
                    <Button 
                        text='Create'
                        handleOnClick={handleRegister}
                        styles={`px-5 py-2.5 border border-black`}
                    />
                </Link>
            </form>
        </div>
    );
};

export default SignUp;