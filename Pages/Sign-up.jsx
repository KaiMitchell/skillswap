
function SignUp() {
    return(
        <form>
            <div className="my-5">
                <label>Enter your email</label>
                <input type="text" />
            </div>
            <div className="my-5">
                <label>Enter a password</label>
                <input type="password" />
            </div>
            <div className="my-5">
                <label>confirm password</label>
                <input type="password" />
            </div>

            <p className="mb-2.5">Already have an account? click <a>here</a></p>
            <button>Create</button>
        </form>
    );
};

export default SignUp;