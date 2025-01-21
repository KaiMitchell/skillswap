import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

const SignInPrompt = ({ setIsSignInPrompt }) => {
    const node = useRef();
    const navigate = new useNavigate();

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsSignInPrompt(false);
        };
    };

    function handleClick() {
        setIsSignInPrompt(false);
        navigate('/sign-in');
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);
    
    return(
        <div 
            ref={node}
            className={`absolute z-20 top-1/2 left-1/2 transorm -translate-y-1/2 -translate-x-1/2 w-fit py-5 px-10 backdrop-blur-sm bg-black/30`}
        >
            <Button 
                handleOnClick={handleClick}
                text={'please sign in to continue'}
            />
        </div>
    );
}

export default SignInPrompt;