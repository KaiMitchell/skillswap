function Button({ 
    text, 
    handleOnMouseLeave,
    handleOnMouseOver,
    handleOnClick,
    isHandleHover,
    styles,
    isDisabled,
}) {

    return(
        <button 
            {...(isHandleHover && { onMouseOver: () => handleOnMouseOver(), onMouseLeave: () => handleOnMouseLeave() })}
            onClick={handleOnClick}
            className={styles}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};

export default Button;