
function Input({ 
    label,
    type,
    styles,
    id,
    name,
    value,
    onChangeHandler,
    isTxtArea,
    isSigninOrRegister,
    fileRef,
    error
}) {

    return(
        <div className='relative'>
            {label && <label htmlFor={id} className='font-bold'>{label}</label>}
            {type !== 'file' && <br />}
            {isTxtArea ? 
                <textarea 
                    value={value} 
                    onChange={(e) => onChangeHandler(e.target.value)} 
                    rows='5' 
                    className='w-full'
                />
            :
                <input 
                    {...(onChangeHandler && !isSigninOrRegister && { onChange: (e) => onChangeHandler(e.target.value) })}
                    {...(isSigninOrRegister && { onChange: (e) => onChangeHandler(e, name)})}
                    {...(type === 'email' && { 
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                        title: 'barbra@example.com',
                        placeholder: 'barbra@example.com' 
                    })}
                    value={value}
                    id={id}
                    ref={fileRef || undefined}
                    type={type}
                    name={name}
                    className={`${isSigninOrRegister && 'w-full'} p-1 border border-black rounded`}
                />
            }
            {error && <p className='absolute top-full text-xs text-red-500'>{error}</p>}
        </div>
    );
};

export default Input;