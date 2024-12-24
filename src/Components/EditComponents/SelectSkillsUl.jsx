import skillCategories from "../../skillData/skills";

function EditSkillsComponent() {
    return(
        <div className='h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar'>
            {Object.keys(skillCategories).map((category) => {
                return(
                    <div key={category} className='relative'>
                        <h3 className='sticky top-0 pl-1 text-large text-stone-400 bg-stone-900'>{category}</h3> 
                        <ul className='bg-red-700'>
                            {skillCategories[category].map((item) => {
                                return <li key={item} className='pl-1 py-2 hover:bg-red-500 text-sm hover:cursor-pointer'>{item}</li>
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default EditSkillsComponent;