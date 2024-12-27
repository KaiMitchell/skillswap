import InitialUl from "./InitialUl";

function PickSkillsCard({ index, obj, isPickMatches, selectedSkills, handleSkillAdd }) {
    return(
        <article className={`group rounded-md relative flex justify-center hover:justify-between w-10 hover:w-full items-center p-5 ${index % 2 === 0 ? 'bg-red-700' : 'bg-stone-800'} text-slate-100`}>
            <div className='hidden group-hover:block w-1/2 text-center'>
                <h2 className='hidden group-hover:block mb-2.5'>Select a skill</h2>
                <InitialUl isPickMatches={isPickMatches} obj={obj} index={index} selectedSkills={selectedSkills} handleSkillAdd={handleSkillAdd} />
            </div>
            <h3 className='text-xl w-fit group-hover:w-1/2 group-hover:text-3xl group-hover:font-bold rotate-90 group-hover:rotate-0 self-center text-center text-nowrap'>{obj.category}</h3>
        </article>
    )
}

export default PickSkillsCard;