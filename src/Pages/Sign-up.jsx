import { useEffect, useState } from 'react';
import Input from '.././Components/Input';
import { Outlet, Link } from 'react-router-dom';

function SignUp() {
    const [newUserDetails, setNewUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleInput(e, type) {
            setNewUserDetails(prev => ({
                ...prev,
                [type]: e.target.value
        }));
    }


    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto p-5 border'>
                <h1 className='text-xl font-bold'>Sign up</h1>
                <Input label="Enter your email" type="text" newUserDetails={newUserDetails.email} handleInput={handleInput} parameterType='email' />
                <Input label="Create a username" type="text" newUserDetails={newUserDetails.username} handleInput={handleInput} parameterType='username' />
                <Input label="Create a password" type="password" newUserDetails={newUserDetails.password} handleInput={handleInput} parameterType='password' />
                <Input label="Confirm your password" type="password" newUserDetails={newUserDetails.confirmPassword} handleInput={handleInput} parameterType='confirmPassword' />
                <p>Already have an account? <Link to="/sign-in" className="text-blue-400">click here</Link></p>
                <Link to="/"className='self-end'><button className='px-5 py-2.5 border border-black'>Create</button></Link>
            </form>
        </div>
    );
};

export default SignUp;