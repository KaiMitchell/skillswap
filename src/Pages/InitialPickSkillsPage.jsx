import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InitialCardsContainer from '../Components/InitialSignUpComponents/InitialCardsContainer';

const PORT = 3000;

function InitialPickSkillsPage({ username }) {
    const [selectedSkills, setSelectedSkills] = useState({
        toTeach: [],
        toLearn: []
    });
    
    async function submitSkills() {
        const response = await fetch(`http://localhost:${PORT}/pick-skills`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...selectedSkills, username: username })
        });
        console.log('username! :', username);
        const data = await response.json();
        console.log(data);
    }

    function handleLearnSkillAdd(skillName) {
        if(selectedSkills.toLearn.includes(skillName) || selectedSkills.toLearn == []) {
            setSelectedSkills(prev => {
                let newObj = {};
                const newArray = [...prev.toLearn];
                const indexOfSkillName = selectedSkills.toLearn.indexOf(skillName);
                newArray.splice(indexOfSkillName, 1);
                newObj = {
                    toTeach: prev.toTeach,
                    toLearn: newArray
                };
                console.log('removed: ', skillName);
                return newObj;
            });
        } else {
            setSelectedSkills(prev => ({
                toTeach: prev.toTeach,
                toLearn: [...prev.toLearn, skillName]
            }));
            console.log('to learn: ', selectedSkills.toLearn);
        };
    };

    function handleTeachSkillAdd(skillName) {
        if(selectedSkills.toTeach.includes(skillName) || selectedSkills.toTeach == []) {
            setSelectedSkills(prev => {
                let newObj = {};
                const newArray = [...prev.toTeach];
                const indexOfSkillName = selectedSkills.toTeach.indexOf(skillName);
                newArray.splice(indexOfSkillName, 1);
                newObj = {
                    toLearn: prev.toLearn,
                    toTeach: newArray
                };
                console.log('removed: ', skillName);
                return newObj;
            });
        } else {
            setSelectedSkills(prev => ({
                toLearn: prev.toLearn,
                toTeach: [...prev.toTeach, skillName]
            }));
            console.log('to teach: ', selectedSkills.toTeach);
        };
    };
    return(
        <div className='p-5 bg-slate-100'>
            <main className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>Let's get you started</h1>
                    <InitialCardsContainer isPickMatches={false} handleSkillAdd={handleLearnSkillAdd} selectedSkills={selectedSkills.toLearn} contentHeader='Pick the skills you would like to learn' />     
                    <InitialCardsContainer isPickMatches={false} handleSkillAdd={handleTeachSkillAdd} selectedSkills={selectedSkills.toTeach} contentHeader='Pick the skills you would like to teach' />
                <div className='self-end flex w-1/4'>
                    <button className='w-1/2 mr-5 p-2.5 border'>Skip</button>
                    <Link to='/pick-matches'>
                        <button onClick={() => submitSkills()} className='w-1/2 p-2.5 border'>Submit</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default InitialPickSkillsPage;