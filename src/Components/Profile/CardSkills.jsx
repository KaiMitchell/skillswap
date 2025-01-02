import { Skills } from "./CardData";

function CardSkills({ profileData, isRenderAllSkills, type }) {
    return(
        <div className={`${isRenderAllSkills ? 'block': 'hidden'} h-1/3`}>
            <p className='ml-2.5 pb-0 text-large font-bold'>{type}</p>
            <ul className={`h-full pl-5 bg-stone-600 overflow-y-auto no-scrollbar`}>
                <Skills profileData={profileData} />
            </ul>
        </div>
    );
};

export default CardSkills;