import { useEffect, useState } from "react";
import SelectSkills from "./SelectSkills";

function SkillsManagementComponent({ setIsUpdating, isSettings }) {
    const [updateSkillsToLearn, setUpdateSkillsToLearn] = useState();
    const [updateSkillsToTeach, setUpdateSkillsToTeach] = useState();
    const [skillsToLearn, setSkillsToLearn] = useState();
    const [skillsToTeach, setSkillsToTeach] = useState();
    const [toLearnPriority, setToLearnPriority] = useState();
    const [toTeachPriority, setToTeachPriority] = useState();
    const [remount, setRemount] = useState(0); // a trigger to update ui with fresh data

    //fetch required skills and re render when updated
    useEffect(() => {
        if(localStorage.getItem('user') !== '') {
            fetchCurrentSkills();
            fetchUnselectedSkills();
        };
    }, [remount, isSettings]);

    //all skills a user is teaching or learning
    async function fetchCurrentSkills() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users-skills?username=${localStorage.getItem('user')}`);

        const data = await response.json();

        console.log(data);

        if (JSON.stringify(data?.toLearn.categories) !== JSON.stringify(skillsToLearn)) {
            setSkillsToLearn(data?.toLearn.categories);
        };
        if (JSON.stringify(data?.toTeach.categories) !== JSON.stringify(skillsToTeach)) {
            setSkillsToTeach(data?.toTeach.categories);
        };
        if (data?.toLearnPriority !== toLearnPriority) {
            setToLearnPriority(data?.toLearnPriority);
        };
        if (data?.toTeachPriority !== toTeachPriority) {
            setToTeachPriority(data?.toTeachPriority);
        };
    };

    //render a list of skills not assigned to the current user
    async function fetchUnselectedSkills() {
        const response = await fetch(`${import.meta.env.VITE_AUTH_URL}/api/unselected-skills?username=${localStorage.getItem('user')}`); 
        const data = await response.json();
        setUpdateSkillsToLearn(data.data);
        setUpdateSkillsToTeach(data.data);
    };

    //delete a skill from skills list
    async function removeSkill(skill, isToLearn) {
        setIsUpdating(true);
        await fetch(`${import.meta.env.VITE_AUTH_URL}/api/remove-skill?skill=${skill}&username=${localStorage.getItem('user')}`, {
            method: 'DELETE'
        });
        //ensure priority is also unset if the skill was a priority
        removeSkillPrioritization(skill, isToLearn);
        setRemount(prev => prev + 1);
        setIsUpdating(false);
    };

    //add a new skill into skill list
    async function addSkill(skill, toLearn) {
        //using a post method because the query inserts not updates
        await fetch(`${import.meta.env.VITE_AUTH_URL}/api/add-skill`, {
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
        setRemount(prev => prev + 1);
    };

    //make a skill a priority
    async function addSkillPrioritization(skill, isToLearn) {
        console.log(isToLearn);
        await fetch(`${import.meta.env.VITE_AUTH_URL}/api/update-priority-skill`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${sessionStorage.getItem('access token')}`
            },
            body: JSON.stringify({ 
                skill, 
                isToLearn,
                user: localStorage.getItem('user') 
            })
        });
        
        if(isToLearn) {
            console.log('to elarn');
            setToLearnPriority(skill);
        } else {
            setToTeachPriority(skill);
        };

        setRemount(prev => prev + 1);
    };

    //undo prioritization
    async function removeSkillPrioritization(skill, isToLearn) {
        await fetch(`${import.meta.env.VITE_AUTH_URL}/api/unprioritize-skill`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${sessionStorage.getItem('access token')}`
            },
            body: JSON.stringify({
                skill,
                isToLearn,
                user: localStorage.getItem('user')
            })
        });
        if(isToLearn) {
            setToLearnPriority();
        } else {
            setToTeachPriority();
        };
        //update ui
        setRemount(prev => prev + 1);
    };

    return(
        <div className='relative flex flex-col gap-10 h-fit w-full'>
            <div>
                <h2 className='text-left text-3xl font-bold'>Current skills</h2>
                <div className='w-full min-h-44 flex flex-col lg:flex-row gap-2.5'>
                    <SelectSkills
                        text='Skills you can teach' 
                        skills={skillsToTeach}
                        handleSkill={removeSkill}  
                        prioritize={addSkillPrioritization} 
                        unprioritize={removeSkillPrioritization}
                        priority={toTeachPriority}                     
                    />
                    <SelectSkills
                        text='Skills you want to learn' 
                        skills={skillsToLearn}
                        handleSkill={removeSkill}     
                        prioritize={addSkillPrioritization} 
                        unprioritize={removeSkillPrioritization} 
                        priority={toLearnPriority}                 
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
                        handleSkill={addSkill}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillsManagementComponent;