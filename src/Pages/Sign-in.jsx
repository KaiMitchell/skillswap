import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '.././Components/Input';
function SignIn() {
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
        if(type === 'email') {
            setNewUserDetails(prev => ({
                username: prev.username,
                email: e.target.value,
                password: prev.password,
                confirmPassword: prev.confirmPassword
            }));
        }
    }

    handleInput();

    return(
        <div className='h-screen flex items-center'>
            <form className='w-fit mx-auto px-5 py-10 border'>
                <h1>{title}</h1>
                <Input label="Enter your email / username" type="text" value={newUserDetails.email} onChange={((e) => handleInput(e.target, 'email'))} />
                <Input label="Create a username" type="text" />
                <Input label="Create a password" type="password" />
                <p className="mb-2.5">Don't have an account? click <a>here</a></p>
                <button className='px-5 py-2.5 border border-black'>Forgot password?</button>
                <Link to="/"><button className='px-5 py-2.5 border border-black'>Create</button></Link>
            </form>
        </div>
    );
};

export default SignIn;