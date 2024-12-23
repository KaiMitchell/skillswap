import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '.././Components/Input';

const backendURL = 'localhost:3000';

function SignIn({ setUser, user }) {
    const [newUserDetails, setNewUserDetails] = useState({
        username: '',
        password: '',
    });

    //update value for each input field.
    function handleChangeInput(e, type) {
        setNewUserDetails(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    function authorize(e) {
        e.preventDefault();
        // if(user) {
        //     <Redirect to='/' />;
        // };
        setUser(true);
        console.log(user);
    };

    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto px-5 py-10 border'>
                <h1 className='text-xl font-bold'>Sign in</h1>
                <Input label="Enter your username" type="text" newUserDetails={newUserDetails.username} parameterType="username" onHandleInputChange={handleChangeInput} />
                <Input label="Enter your password" type="password" newUserDetails={newUserDetails.password} parameterType="password" onHandleInputChange={handleChangeInput} />
                <p>Don't have an account? <Link to="/register" className='text-blue-400'>click here</Link></p>
                <Link>Forgot password?</Link>
                {/* Why do I need to neg the mt? */}
                <button onClick={(e) => authorize(e)} className='px-5 py-2.5 border border-black'>Sign in</button>
                {user && <Navigate to='/' />}
            </form>
        </div>
    );
};

export default SignIn;