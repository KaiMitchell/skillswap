
import PickSkillsContainer from "../Components/PickSkillsContainer";

function SecondPageAfterSignUpPage() {
 return(
    <div className='p-5'>
        <main className='flex flex-col gap-5'>
            <h1 className='text-3xl font-bold'>Recommended matches</h1>
            <div>
                <h2 className='text-2xl'>Complimentary skill matches</h2>
                <PickSkillsContainer />
            </div>
            <div>
                <h2 className='text-2xl'>Your interested skill matches</h2>
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

export default SecondPageAfterSignUpPage;