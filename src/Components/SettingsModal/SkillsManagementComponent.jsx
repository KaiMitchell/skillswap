import SelectSkills from "./SelectSkills";
import DeleteSkills from "./DeleteSkills";
import CurrentSkills from "./Currentskills";
import SectionContainer from './SectionContainer';

function SkillsManagementComponent() {
    return(
        <div className='flex flex-col gap-10 h-fit w-full'>
            <SectionContainer 
                header='Current skills' 
                section1={
                    <CurrentSkills 
                        text='Skills you can teach' 
                    />
                } 
                section2={
                    <SelectSkills 
                        text='Skills you can learn' 
                    />
                }
            />
            <SectionContainer 
                header='Pick new skills' 
                section1={
                    <SelectSkills 
                        text='Pick skills to teach' 
                    />
                } 
                section2={
                    <SelectSkills 
                        text='Pick skills to learn' 
                    />
                }
            />
            <SectionContainer 
                header='Remove skills' 
                section1={
                    <DeleteSkills 
                        text='Remove from skills to teach' 
                    />
                } 
                section2={
                    <DeleteSkills 
                        text='Remove from skills to learn' 
                    />
                }
            />
        </div>
    );
};

export default SkillsManagementComponent;