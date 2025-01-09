import { useEffect, useState } from "react";
import SelectSkills from "./SelectSkills";
import DeleteSkills from "./DeleteSkills";
import SectionContainer from './SectionContainer';
import { CurrentSkillsToLearn, CurrentSkillsToTeach } from "./SMLists";

function SkillsManagementComponent() {
    const [skillsToLearn, setSkillsToLearn] = useState();
    const [skillsToTeach, setSkillsToTeach] = useState();
    useEffect(() => {
        async function fetchSkills() {
            const response = await fetch(`http://localhost:3000/fetch-users-skills?username=${localStorage.getItem('user')}`);
            const data = await response.json();
            console.log(data)
            setSkillsToLearn(data?.toLearn);
            setSkillsToTeach(data?.toTeach);
        };
        fetchSkills();
    }, []);
    return(
        <div className='flex flex-col gap-10 h-fit w-full'>
            <SectionContainer 
                header='Current skills' 
                section1={
                    <SelectSkills
                        text='Skills you can teach' 
                        skills={skillsToTeach}
                    />
                } 
                section2={
                    <SelectSkills
                        text='Skills you can learn' 
                        skills={skillsToLearn}
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