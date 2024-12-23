import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '.././Components/Input';

const backendURL = 'localhost:3000';

function SignIn({ setUser, username }) {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        console.log(userDetails);
    }, [userDetails]);

    //update value for each input field.
    function handleChangeInput(e, type) {
        setUserDetails(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    async function authorize(e) {
        e.preventDefault();
        const response = await fetch(`http://${backendURL}/sign-in`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userDetails)
        });
        const data = await response.json(); 

        if(data.authorized) {
            setUser({ username: userDetails.username });
            localStorage.setItem("user", userDetails.username);
        };
    };

    function clearForm() {
        setUserDetails(prev => {
            const newObj = {};
            Object.keys(prev).forEach((key) => newObj[key] = '');
            return newObj;
        });
    }

    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto px-5 py-10 border'>
                <h1 className='text-xl font-bold'>Sign in</h1>
                <Input label="Enter your username" type="text" userDetails={userDetails.username} parameterType="username" handleInput={handleChangeInput} />
                <Input label="Enter your password" type="password" userDetails={userDetails.password} parameterType="password" handleInput={handleChangeInput} />
                <p>Don't have an account? <Link to="/register" className='text-blue-400'>click here</Link></p>
                <Link>Forgot password?</Link>
                {/* Why do I need to neg the mt? */}
                <button onClick={(e) => {clearForm(), authorize(e)}} className='px-5 py-2.5 border border-black'>Sign in</button>
                {username && <Navigate to='/' />}
            </form>
        </div>
    );
};

export default SignIn;