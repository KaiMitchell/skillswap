import { Link } from 'react-router-dom';
import Input from '.././Components/Input';
function SignIn() {
    return(
        <div className='h-screen flex items-center'>
            <form className='w-fit mx-auto px-5 py-10 border'>
                <h1>Sign up</h1>
                <Input label="Enter your email / username" type="text" />
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