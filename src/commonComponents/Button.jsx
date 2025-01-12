function Button({ text }) {
    return(
        <button 
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => alert('clicked')}
        >
            {text}
        </button>
    );
};

export default Button;