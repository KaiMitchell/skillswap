
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
    placeholder,
    error
}) {

    return(
        <div className='relative flex flex-col'>
            {label && <label htmlFor={id} className='font-bold'>{label}</label>}
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
                    placeholder={placeholder || ''}
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