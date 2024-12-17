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

    useEffect(() => {
        console.log(newUserDetails)
    }, [newUserDetails]);

    function handleInput(e, type) {
            setNewUserDetails(prev => ({
                ...prev,
                [type]: e.target.value
        }));
    }


    return(
        <div className='h-screen flex items-center'>
            <form className='w-fit mx-auto p-5 border'>
                <h1>Sign up</h1>
                <Input label="Enter your email" type="text" newUserDetails={newUserDetails.email} handleInput={handleInput} parameterType='email' />
                <Input label="Create a username" type="text" newUserDetails={newUserDetails.username} handleInput={handleInput} parameterType='username' />
                <Input label="Create a password" type="password" newUserDetails={newUserDetails.password} handleInput={handleInput} parameterType='password' />
                <Input label="Confirm your password" type="password" newUserDetails={newUserDetails.confirmPassword} handleInput={handleInput} parameterType='confirmPassword' />
                <p className="mb-2.5">Already have an account? click <Link to="/sign-in">here</Link></p>
                <div className="flex justify-end">
                    <Link to="/"><button className='px-5 py-2.5 border border-black'>Create</button></Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;