import Selection from './Selection.jsx';

function SignInSignUp({ setIsNavDropdown, username }) {
    return(
        <div className='w-full bg-stone-950 shadow-[-7px_0px_10px_0px_black;] sm:sticky sm:right-0 sm:flex sm:h-auto sm:w-auto'>
            {!username && <Selection setIsNavDropdown={setIsNavDropdown} text="Register" path="/register" isLink={true}  />}
            {!username && <Selection setIsNavDropdown={setIsNavDropdown} text="Sign in" path="/sign-in" isLink={true}  />}
        </div>
    );
};

export default SignInSignUp;