import skillCategories from '../skillData/skills.js';
import SelectSkillsComponent from './EditComponents/SelectSkillsComponent.jsx';
import UpdateSkillsComponent from './EditComponents/UpdateSkillsComponent.jsx';

function SettingsModal() {
    console.log(skillCategories);
    
    return(
        <div className='fixed size-10/12 m-auto z-20 top-0 bottom-0 left-0 right-0 px-10 pt-2.5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar'>
            <div className='w-full h-1/3 flex justify-between'>   
                <form className='w-1/2'>
                    <label className='font-bold'>upload profile picture</label><br />
                    <input type="text" className='p-1 border border-r-0 border-black rounded rounded-r-none'/>
                    <button className='px-2.5 py-1 border border-l-0 border-black rounded rounded-l-none'>upload</button>
                    <br />
                    <br />
                    <label className='font-bold'>change username</label><br />
                    <input type="text" className='p-1 border border-r-0 border-black rounded rounded-r-none'/>
                    <button className='px-2.5 py-1 border border-l-0 border-black rounded rounded-l-none'>Change</button>
                </form>
                {/* image */}
                <div className='w-1/3 flex justify-between items-center'>
                    <h3>new username</h3>
                    <h3 className=''>User</h3>
                    <div className='min-w-40 min-h-40 bg-black rounded-full flex justify-center items-center text-white'>Image</div>
                </div>
            </div>
            <div className='flex gap-5 h-2/3 w-full'>
                <div className='w-1/2 h-full flex flex-col gap-2.5'>
                    <SelectSkillsComponent text='Pick skills to teach' />
                    <SelectSkillsComponent text='Pick skills to learn' />
                </div>
                <div className='w-1/2 flex h-full flex-col gap-2.5'>
                    <UpdateSkillsComponent text='Updated skills to teach' />
                    <UpdateSkillsComponent text='Updated skills to learn' />
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;