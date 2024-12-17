

function Input({ label, type, parameterType, handleInput, newUserDetails }) {

    return(
        <div className="my-5">
            <label className='text-xl'>{label}</label><br />
            <input type={type} className='border p-2.5 text-xl' value={newUserDetails} onChange={(e) => handleInput(e, parameterType)}/>
        </div>
    )
}

export default Input;