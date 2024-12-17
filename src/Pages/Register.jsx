import { useEffect, useState } from 'react';
import Input from '../Components/Input';
import { Outlet, Link } from 'react-router-dom';

const PORT = 3000;

function SignUp() {
    const [newUserData, setnewUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function handleInput(e, type) {
            setnewUserData(prev => ({
                ...prev,
                [type]: e.target.value
        }));
    };

    async function handleRegister() {
        const response = await fetch(`http://localhost:${PORT}/register`, {
            method : "POST"  ,
            headers: {
                "Content-Type" : "application/json",
            },
            body: newUserData
        });

        console.log(newUserData);
        const data = await response.json();
        console.log(data);
        // const data = await response.json();

        // console.log('data: ', data); 
    }


    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto p-5 border'>
                <h1 className='text-xl font-bold'>Sign up</h1>
                <Input label="Enter your email" type="text" newUserData={newUserData.email} handleInput={handleInput} parameterType='email' />
                <Input label="Create a username" type="text" newUserData={newUserData.username} handleInput={handleInput} parameterType='username' />
                <Input label="Create a password" type="password" newUserData={newUserData.password} handleInput={handleInput} parameterType='password' />
                <Input label="Confirm your password" type="password" newUserData={newUserData.confirmPassword} handleInput={handleInput} parameterType='confirmPassword' />
                <p>Already have an account? <Link to="/sign-in" className="text-blue-400">click here</Link></p>
                <Link to="/" className='self-end'><button onClick={handleRegister} className='px-5 py-2.5 border border-black'>Create</button></Link>
            </form>
        </div>
    );
};

export default SignUp;