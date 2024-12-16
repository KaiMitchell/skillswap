

function Input({ label, type }) {
    return(
        <div className="my-5">
            <label className='text-xl'>{label}</label><br />
            <input type={type} className='border p-2.5 text-xl'/>
        </div>
    )
}

export default Input;