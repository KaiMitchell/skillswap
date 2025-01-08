import { useContext } from 'react';
import Input from '../Components/Input';
import { Link } from 'react-router-dom';
import { TokenContext } from '../App';

const PORT = 4000;

function SignUp({ setNewUserData, newUserData }) {
    const { setAccessToken } = useContext(TokenContext);

    function handleInput(e, type) {
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
                <Input label="Enter your email" type="text" userDetails={newUserData.email} handleInput={handleInput} parameterType='email' />
                <Input label="Create a username" type="text" userDetails={newUserData.username} handleInput={handleInput} parameterType='username' />
                <Input label="Create a password" type="password" userDetails={newUserData.password} handleInput={handleInput} parameterType='password' />
                <Input label="Confirm your password" type="password" userDetails={newUserData.confirmPassword} handleInput={handleInput} parameterType='confirmPassword' />
                <p>Already have an account? <Link to="/sign-in" className="text-blue-400">click here</Link></p>
                <Link to="/pick-skills" className='self-end'>
                    <button onClick={handleRegister} className='px-5 py-2.5 border border-black'>Create</button>
                </Link>
            </form>
        </div>
    );
};

export default SignUp;