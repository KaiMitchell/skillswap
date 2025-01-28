import Selection from './Selection.jsx';

function SignInSignUp({ setIsNavDropdown, username }) {
    return(
        <div className={`w-full h-[132px] border-t sm:sticky sm:right-0 sm:flex sm:h-auto sm:w-auto sm:border-none`}>
            {!username && <Selection setIsNavDropdown={setIsNavDropdown} text="Register" path="/register" isLink={true}  />}
            {!username && <Selection setIsNavDropdown={setIsNavDropdown} text="Sign in" path="/sign-in" isLink={true}  />}
        </div>
    );
};

export default SignInSignUp;