import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InitialCardsContainer from '../Components/InitialSignUpComponents/InitialCardsContainer';

const PORT = 3000;

function InitialPickSkillsPage({ username, setUser, skills }) {
    const [selectedSkills, setSelectedSkills] = useState({
        toTeach: [],
        toLearn: []
    });
    
    async function submitSkills() {
        try {
            const response = await fetch(`http://localhost:${PORT}/pick-skills`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...selectedSkills, username: username })
            });
            console.log(await response.json());
            setUser({ username: username });
            localStorage.setItem('user', username);
        } catch(err) {
            console.error(err);
        };
    };

    function handleLearnSkillAdd(skillName) {
        setSelectedSkills(prev => {
            const isSelected = prev.toLearn.includes(skillName);
            const updatedToLearn = isSelected ? prev.toLearn.filter((skill) => skill !== skillName)
                                                : [...prev.toLearn, skillName];
            return {
                ...prev,
                toLearn: updatedToLearn
            };
        });
    };

    function handleTeachSkillAdd(skillName) {
        setSelectedSkills(prev => {
            const isSelected = prev.toTeach.includes(skillName);
            const updatedToTeach = isSelected ? prev.toTeach.filter((skill) => skill !== skillName)
                                              : [...prev.toTeach, skillName];
            return {
                ...prev,
                toTeach: updatedToTeach
            };
        });
    };
    return(
        <div className='p-5 bg-slate-100'>
            <main className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>Let's get you started</h1>
                    <InitialCardsContainer skills={skills} isPickMatches={false} handleSkillAdd={handleLearnSkillAdd} selectedSkills={selectedSkills.toLearn} contentHeader='Pick the skills you would like to learn' />     
                    <InitialCardsContainer skills={skills} isPickMatches={false} handleSkillAdd={handleTeachSkillAdd} selectedSkills={selectedSkills.toTeach} contentHeader='Pick the skills you would like to teach' />
                <div className='self-end flex w-1/4'>
                    <button className='w-1/2 mr-5 p-2.5 border'>Skip</button>
                    <Link to='/' onClick={() => submitSkills()}>
                        <button className='w-1/2 p-2.5 border'>Submit</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default InitialPickSkillsPage;