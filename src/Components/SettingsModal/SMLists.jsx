import SMList from "./SMList";

function SkillsList({ skills, handleSkill, text }) {
    return(
        <div className='h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar'>
            {skills?.map((obj) => {
                return(
                    <div key={obj.category} className='relative'>
                        <h3 className='sticky top-0 pl-1 text-large text-stone-400 bg-stone-900'>{obj.category}</h3> 
                        <ul className='bg-red-700'>
                            {obj?.skills.map((skill) => {
                                return (
                                    <SMList 
                                        key={skill}
                                        skill={skill}
                                        handleSkill={handleSkill}
                                        text={text}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default SkillsList;