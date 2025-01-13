function handleClientSideValidation({
    username,
    password,
    email,
    confirmPassword,
    newErrors
}) {

    //validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //invalid values for username
    if(!username) {
        newErrors.username = 'Username is required';
    } else if(username.length <= 4) {
        newErrors.username = 'Username must be atleast 4 characters long';
    };

    //invalid values for email
    if(!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
    };

    //invalid values for password
    if(!password) {
        newErrors.password = 'Password is required';
    } else if(password.length < 12) {
        newErrors.password = 'Password must contain atleast 13 characters';
    };

    //invalid values for password confirmation
    if(password && password.length > 11 && password !== confirmPassword) {
        newErrors.confirmPassword = 'Password do not match';
    };    

};

export default handleClientSideValidation;