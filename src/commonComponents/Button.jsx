function Button({ 
    text, 
    handleOnMouseLeave,
    handleOnMouseOver,
    handleOnClick,
    isHover,
    styles
}) {


    return(
        <button 
            {...(isHover && { onMouseOver: () => handleOnMouseOver(), onMouseLeave: () => handleOnMouseLeave() })}
            onClick={handleOnClick}
            className={styles}
        >
            {text}
        </button>
    );
};

export default Button;