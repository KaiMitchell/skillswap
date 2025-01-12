function Button({ 
    text, 
    handleOnMouseLeave,
    handleOnMouseOver,
    handleOnClick,
    isHandleHover,
    styles
}) {


    return(
        <button 
            {...(isHandleHover && { onMouseOver: () => handleOnMouseOver(), onMouseLeave: () => handleOnMouseLeave() })}
            onClick={handleOnClick}
            className={styles}
        >
            {text}
        </button>
    );
};

export default Button;