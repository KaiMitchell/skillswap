import Input from '.././Components/Input';
import { Outlet, Link } from 'react-router-dom';

function SignUp() {
    return(
        <div className='h-screen flex items-center'>
            <form className='w-fit mx-auto p-5 border'>
                <h1>Sign up</h1>
                <Input label="Enter your email" type="text" />
                <Input label="Create a username" type="text" />
                <Input label="Create a password" type="password" />
                <Input label="Confirm your password" type="password" />
                <p className="mb-2.5">Already have an account? click <Link to="/sign-in">here</Link></p>
                <div className="flex justify-end">
                    <Link to="/"><button className='px-5 py-2.5 border border-black'>Create</button></Link>
                </div>
            </form>
        </div>
    );
};

export default SignUp;