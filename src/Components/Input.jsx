

function Input({ label, type, parameterType, handleInput, newUserDetails }) {

    return(
        <div>
            <label className='text-large'>{label}</label><br />
            <input type={type} className='border p-2.5 text-large w-full' value={newUserDetails} onChange={(e) => handleInput(e, parameterType)}/>
        </div>
    )
}

export default Input;