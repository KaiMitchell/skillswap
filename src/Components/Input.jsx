

function Input({ label, type, parameterType, handleInput, userDetails }) {

    return(
        <div>
            <label className='text-large'>{label}</label><br />
            <input type={type} className='border p-2.5 text-large w-full' value={userDetails} onChange={(e) => handleInput(e, parameterType)}/>
        </div>
    )
}

export default Input;