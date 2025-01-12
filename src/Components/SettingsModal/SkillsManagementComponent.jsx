import { useEffect, useState } from "react";
import SelectSkills from "./SelectSkills";
import SectionContainer from './SectionContainer';

function SkillsManagementComponent() {

    const [updateSkillsToLearn, setUpdateSkillsToLearn] = useState();
    const [updateSkillsToTeach, setUpdateSkillsToTeach] = useState();
    const [skillsToLearn, setSkillsToLearn] = useState();
    const [skillsToTeach, setSkillsToTeach] = useState();
    const [selectedSkill, setSelectedSkill] = useState(''); // a trigger to update ui with fresh data

    //fetch required skills and re render when updated
    useEffect(() => {

        fetchCurrentSkills();
        fetchUnselectedSkills();
        
    }, [selectedSkill]);

    //all skills a user is teaching or learning
    async function fetchCurrentSkills() {

        const response = await fetch(`http://localhost:3000/fetch-users-skills?username=${localStorage.getItem('user')}`);
        
        const data = await response.json();

        setSkillsToLearn(data?.toLearn.categories);
        setSkillsToTeach(data?.toTeach.categories);
    
    };

    //renderring of a list of skills not assigned to the current user
    async function fetchUnselectedSkills() {

        const response = await fetch(`http://localhost:4000/fetch-unselected-skills?username=${localStorage.getItem('user')}`);
        
        const data = await response.json();

        setUpdateSkillsToLearn(data.data);
        setUpdateSkillsToTeach(data.data);
    
    };

    async function removeSkill(skill) {

        const response = await fetch(`http://localhost:4000/remove-skill?skill=${skill}&username=${localStorage.getItem('user')}`);
        
        const data = await response.json();

        if(response.status === 200) {

            setSelectedSkill(() => `${skill}${data.rowCount}`);
        
        };
    
    };

    async function addSkill(skill, toLearn) {

        const response = await fetch(`http://localhost:4000/add-skill`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${sessionStorage.getItem('access token')}`
            },
            body: JSON.stringify({ 
                skill: skill, 
                username: localStorage.getItem('user'),
                toLearn: toLearn
            })
        });

        const data = await response.json();
        
        if(response.status === 200) {

            setSelectedSkill(() => `${skill}${data.rowCount}`);
            console.log(skill + data);
        
        };
    
    };


    return(
        <div className='flex flex-col gap-10 h-fit w-full'>
            <SectionContainer 
                header='Current skills' 
                section1={
                    <SelectSkills
                        text='Skills you can teach' 
                        skills={skillsToTeach}
                        handleSkill={removeSkill}                        
                    />
                } 
                section2={
                    <SelectSkills
                        text='Skills you want to learn' 
                        skills={skillsToLearn}
                        handleSkill={removeSkill}                        
                    />
                }
            />
            <SectionContainer 
                header='Pick new skills' 
                section1={
                    <SelectSkills 
                        text='Pick skills to teach'
                        skills={updateSkillsToLearn}
                        handleSkill={addSkill} 
                    />
                } 
                section2={
                    <SelectSkills 
                        text='Pick skills to learn'
                        skills={updateSkillsToTeach}
                        handleSkill={addSkill} 
                    />
                }
            />
        </div>
    );
};

export default SkillsManagementComponent;