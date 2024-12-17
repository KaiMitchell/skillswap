import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '.././Components/Input';
function SignIn() {
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
    }

    return(
        <div className='h-screen flex items-center'>
            <form className='flex flex-col gap-5 w-fit mx-auto px-5 py-10 border'>
                <h1 className='text-xl font-bold'>Sign in</h1>
                <Input label="Enter your username" type="text" newUserDetails={newUserDetails.username} parameterType="username" onHandleInputChange={handleChangeInput} />
                <Input label="Enter your password" type="password" newUserDetails={newUserDetails.password} parameterType="password" onHandleInputChange={handleChangeInput} />
                <p>Don't have an account? <Link to="/register" className='text-blue-400'>click here</Link></p>
                <Link>Forgot password?</Link>
                {/* Why do I need to neg the mt? */}
                <Link to="/" className="self-end"><button className='px-5 py-2.5 border border-black'>Create</button></Link>
            </form>
        </div>
    );
};

export default SignIn;