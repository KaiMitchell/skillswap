import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PickSkillsContainer from "../Components/PickSkillsContainer";

function FirstAfterSignUp() {
    const [selectedSkills, setSelectedSkills] = useState({
        toTeach: [],
        toLearn: []
    });

    function handleLearnSkillAdd(skillName) {
        if(selectedSkills.toLearn.includes(skillName) || selectedSkills.toLearn == []) {
            setSelectedSkills(prev => {
                const newObj = {};
                const newArray = [...prev.toLearn];
                const indexOfSkillName = selectedSkills.toLearn.indexOf(skillName);
                newArray.splice(indexOfSkillName, 1);
                newObj = {
                    toTeach: prev.toTeach,
                    toLearn: newArray
                };

                return newObj;
            });
        } else {
            setSelectedSkills(prev => ({
                toTeach: prev.toTeach,
                toLearn: [...prev.toLearn, skillName]
            }));
        };
        console.log(selectedSkills);
    };

    function handleTeachSkillAdd(skillName) {
        if(selectedSkills.toTeach.includes(skillName) || selectedSkills.toTeach == []) {
            setSelectedSkills(prev => {
                const newObj = {};
                const indexOfSkillName = selectedSkills.toTeach.indexOf(skillName);
                console.log(selectedSkills.toTeach[indexOfSkillName]);
                newArray.splice(indexOfSkillName, 1);

                newObj = {
                    toLearn: prev.toLearn,
                    toTeach: [...prev.toTeach, skillName]
                };

                return newObj;
            });
        } else {
            setSelectedSkills(prev => [...prev, skillName]);
        };
        console.log(selectedSkills);
    };
    return(
        <div className='p-5 bg-slate-100'>
            <main className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>Let's get you started</h1>
                <form className='flex'>
                    <input type='text' className='w-full p-2.5 border border-r-0' placeholder='under development' />
                    <button className='px-2.5 border'>submit</button>
                </form>
                <div className='h-1/2'>
                    <h2 className='text-2xl'>Pick the skills you'd like to learn</h2>
                    <PickSkillsContainer handleSkillAdd={handleLearnSkillAdd} />
                </div>
                <div>
                    <h2 className='text-2xl'>Pick the skills you'd like to teach</h2>
                    <PickSkillsContainer handleSkillAdd={handleTeachSkillAdd} />
                </div>
                <div className='self-end flex w-1/4'>
                    <button className='w-1/2 mr-5 p-2.5 border'>Skip</button>
                    <Link to='/pick-matches'><button className='w-1/2 p-2.5 border'>Submit</button></Link>
                </div>
            </main>
        </div>
    );
}

export default FirstAfterSignUp;