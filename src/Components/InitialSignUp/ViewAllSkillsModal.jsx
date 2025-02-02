import Button from "../../commonComponents/Button";
import SelectedSkillsContainer from "./SelectedSkillsContainer";

const ViewAllSkills = ({
    selectedSkills,
    setIsShowSelectedSkills,
    submitSkills,
}) => {

    const mappedToLearnSkills = selectedSkills?.toLearn.map(skill => {
        return(
            <div 
                key={skill}
                className='flex justify-between'
            >
                <p>{skill}</p>
                <button>
                    delete
                </button>
            </div>
        );
    });

    const mappedToTeachSkills = selectedSkills?.toTeach.map(skill => {
        return(
            <div 
                key={skill}
                className='flex justify-between'
            >
                <p>{skill}</p>
                <button>
                    delete
                </button>
            </div>
        );
    });

    return(
        <div className={`fixed m-auto z-20 top-[60px] left-0 right-0 sm:w-2/3 h-3/4 sm:rounded text-white text-center bg-gradient-to-r from-orange-200/70 via-orange-300/70 to-orange-400/70 backdrop-blur-sm shadow-xl shadow-black sm:top-0 sm:bottom-0`}>
            <div className={`relative size-full flex flex-col justify-between p-5`}>
                <Button 
                    text='X'
                    styles='absolute top-0 right-0 py-2.5 px-5 rounded-bl bg-black/50 hover:bg-black/40'
                    handleOnClick={() => setIsShowSelectedSkills(false)}
                />
                <h2 className="text-center font-bold">SELECTED SKILLS</h2>
                <SelectedSkillsContainer 
                    text={'Selected Skills To Learn'}
                    mappedSkills={mappedToLearnSkills}
                />
                <SelectedSkillsContainer 
                    text={'Selected Skills To Teach'}
                    mappedSkills={mappedToTeachSkills}
                />
                <div>
                <Button 
                    text='Submit'
                    styles={`py-2.5 px-10 bg-black/50 hover:bg-black/40`}
                    handleOnClick={submitSkills}
                />
                </div>
            </div>
        </div>
    );
};

export default ViewAllSkills;