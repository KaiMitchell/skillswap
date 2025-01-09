import { useEffect, useState } from "react";
import SelectSkills from "./SelectSkills";
// import DeleteSkills from "./DeleteSkills";
import SectionContainer from './SectionContainer';

function SkillsManagementComponent() {
    const [updateSkillsToLearn, setUpdateSkillsToLearn] = useState();
    const [updateSkillsToTeach, setUpdateSkillsToTeach] = useState();
    const [skillsToLearn, setSkillsToLearn] = useState();
    const [skillsToTeach, setSkillsToTeach] = useState();

    //Fetch skill associated with current user
    useEffect(() => {
        fetchCurrentSkills();
        fetchAllSkills();
    }, []);

    async function fetchCurrentSkills() {
        const response = await fetch(`http://localhost:3000/fetch-users-skills?username=${localStorage.getItem('user')}`);
        const data = await response.json();
        console.log('current skills: ', data.toLearn.categories)
        setSkillsToLearn(data?.toLearn.categories);
        setSkillsToTeach(data?.toTeach.categories);
    };

    async function fetchAllSkills() {
        const response = await fetch(`http://localhost:3000/fetch-skills`);
        const data = await response.json();
        console.log('all skill: ', data);
        setUpdateSkillsToLearn(data.data);
        setUpdateSkillsToTeach(data.data);
    };

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
                        text='Skills you want to learn' 
                        skills={skillsToLearn}
                    />
                }
            />
            <SectionContainer 
                header='Pick new skills' 
                section1={
                    <SelectSkills 
                        text='Pick skills to teach'
                        skills={updateSkillsToLearn} 
                    />
                } 
                section2={
                    <SelectSkills 
                        text='Pick skills to learn'
                        skills={updateSkillsToTeach} 
                    />
                }
            />
            {/* <SectionContainer 
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
            /> */}
        </div>
    );
};

export default SkillsManagementComponent;