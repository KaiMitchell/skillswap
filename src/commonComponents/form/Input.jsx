import { useRef } from "react";

function Input({ 
    label,
    type,
    styles,
    name,
    value,
    onChangeHandler,
    isTxtArea,
    fileRef
}) {
    return(
        <div>
            {label && <label className='font-bold'>{label}</label>}
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
                    {...(onChangeHandler && { onChange: (e) => onChangeHandler(e.target.value) })}
                    value={value}
                    ref={fileRef || undefined}
                    type={type}
                    name={name}
                    className='p-1 border border-black rounded'
                />
            }
        </div>
    );
};

export default Input;