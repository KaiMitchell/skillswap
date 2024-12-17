
import PickSkillsContainer from "../Components/PickSkillsContainer";

function FirstAfterSignUp() {
 return(
    <div className='p-5'>
        <main className='flex flex-col gap-5'>
            <h1 className='text-3xl font-bold'>Let's get you started</h1>
            <form className='flex'>
                <input type='text' className='w-full p-2.5 border border-r-0' placeholder='under development' />
                <button className='px-2.5 border'>submit</button>
            </form>
            <div>
                <h2 className='text-2xl'>Pick the skills you'd like to learn</h2>
                <PickSkillsContainer />
            </div>
            <div>
                <h2 className='text-2xl'>Pick the skills you'd like to teach</h2>
                <PickSkillsContainer />
            </div>
            <div className='self-end flex w-1/4'>
                <button className='w-1/2 mr-5 p-2.5 border'>Skip</button>
                <button className='w-1/2 p-2.5 border'>Submit</button>
            </div>
        </main>
    </div>
 );
}

export default FirstAfterSignUp;