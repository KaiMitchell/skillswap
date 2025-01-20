import { useEffect, useState } from "react";
import SelectSkills from "./SelectSkills";

function SkillsManagementComponent() {

    const [updateSkillsToLearn, setUpdateSkillsToLearn] = useState();
    const [updateSkillsToTeach, setUpdateSkillsToTeach] = useState();
    const [skillsToLearn, setSkillsToLearn] = useState();
    const [skillsToTeach, setSkillsToTeach] = useState();
    const [prioritizedSkill, setPrioritizedSkill] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(''); // a trigger to update ui with fresh data

    //fetch required skills and re render when updated
    useEffect(() => {

        fetchCurrentSkills();
        fetchUnselectedSkills();
        
    }, [selectedSkill]);

    //all skills a user is teaching or learning
    async function fetchCurrentSkills() {

        const response = await fetch(`http://localhost:3000/users-skills?username=${localStorage.getItem('user')}`);
        
        const data = await response.json();

        setSkillsToLearn(data?.toLearn.categories);
        setSkillsToTeach(data?.toTeach.categories);
    
    };

    //render a list of skills not assigned to the current user
    async function fetchUnselectedSkills() {

        const response = await fetch(`http://localhost:4000/unselected-skills?username=${localStorage.getItem('user')}`);
        
        const data = await response.json();

        setUpdateSkillsToLearn(data.data);
        setUpdateSkillsToTeach(data.data);
    
    };

    //delete a skill from skills list
    async function removeSkill(skill) {

        const response = await fetch(`http://localhost:4000/remove-skill?skill=${skill}&username=${localStorage.getItem('user')}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();

        if(response.status === 200) {

            setSelectedSkill(() => `${skill}${data.rowCount}`);
        
        };
    
    };

    //add a new skill into skill list
    async function addSkill(skill, toLearn) {
        //using a post method because the query inserts not updates
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

    async function handleSkillPrioritization(skill) {
        const response = await fetch(`http://localhost:4000/update-priority-skill`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${sessionStorage.getItem('access token')}`
            },
            body: JSON.stringify({ skill, user: localStorage.getItem('user') })
        });
        
        if(response.status === 200) {
            const data = await response.json();
            setPrioritizedSkill(data.prioritizedSkill);
            console.log(data);
        };
    };

    return(
        <div className='flex flex-col gap-10 h-fit w-full'>
            <div>
                <h2 className='text-left text-3xl font-bold'>Current skills</h2>
                <div className='w-full min-h-44 flex flex-col lg:flex-row gap-2.5'>
                    <SelectSkills
                        text='Skills you can teach' 
                        skills={skillsToTeach}
                        handleSkill={removeSkill}  
                        prioritize={handleSkillPrioritization} 
                        prioritizedSkill={prioritizedSkill}                     
                    />
                    <SelectSkills
                        text='Skills you want to learn' 
                        skills={skillsToLearn}
                        handleSkill={removeSkill}     
                        prioritize={handleSkillPrioritization}  
                        prioritizedSkill={prioritizedSkill}                 
                    />
                </div>
            </div>
            <div>
                <h2 className='text-left text-3xl font-bold'>Pick new skills</h2>
                <div className='w-full min-h-44 flex flex-col lg:flex-row gap-2.5'>
                    <SelectSkills 
                        text='Pick skills to teach'
                        skills={updateSkillsToLearn}
                        handleSkill={addSkill} 
                    />
                    <SelectSkills 
                        text='Pick skills to learn'
                        skills={updateSkillsToTeach}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillsManagementComponent;