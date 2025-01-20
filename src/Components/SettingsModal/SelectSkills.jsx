
import MapData from "../../features/methods/MapData";
import SMList from './SMList.jsx';

function SelectSkills({ 
    text, 
    skills, 
    handleSkill,
    prioritize,
    priority,
 }) {
    return(
        <div className='min-h-1/2 w-full'>
            <h3 className='text-xl font-bold text-right'>{text}</h3>
            <ul className='h-40 bg-black w-full text-white rounded overflow-y-auto no-scrollbar'>
                <MapData 
                    data={skills}
                    render={(obj) => {
                        return(
                            <div key={obj.category} className='relative'>
                                <h3 className='sticky top-0 pl-1 text-large text-stone-400 bg-stone-900'>{obj.category}</h3> 
                                <ul className='bg-red-700'>
                                    <MapData 
                                        data={obj?.skills}
                                        render={(skill) => {
                                            return(
                                                <SMList 
                                                    key={skill}
                                                    skill={skill}
                                                    handleSkill={handleSkill}
                                                    text={text}
                                                    prioritize={prioritize}
                                                    priority={priority}
                                                />
                                            )
                                        }}
                                    />
                                </ul>
                            </div>
                        )
                    }}
                />
            </ul>
        </div>
    );
};

export default SelectSkills;