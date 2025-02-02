import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../Components/InitialSignUp/Container';
import Button from '../commonComponents/Button';
import ViewAllSkills from '../Components/InitialSignUp/ViewAllSkillsModal';

function InitialPickSkillsPage({ username, setCurrentPage, skills }) {
    const [selectedSkills, setSelectedSkills] = useState({
        toTeach: [],
        toLearn: []
    });
    const [isShowSelectedSkills, setIsShowSelectedSkills] = useState(false);

    //set let the header component know it is on the initial skills pick page to change it's color
    useEffect(() => {
        setCurrentPage('initial skills pick');
    }, []);

    const navigate = new useNavigate();
    
    async function submitSkills() {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/pick-skills`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...selectedSkills, username: username })
            });
            setCurrentPage('');
            navigate('/');
        } catch(err) {
            console.error(err);
        };
    };

    //select desired skills
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

    //select skills to offer
    function handleTeachSkillAdd(skillName) {
        setSelectedSkills(prev => {
            const isSelected = prev.toTeach.includes(skillName);
            const updatedToTeach = (isSelected ? 
                prev.toTeach.filter((skill) => skill !== skillName)
            : 
                [...prev.toTeach, skillName]
            );
            return {
                ...prev,
                toTeach: updatedToTeach
            };
        });
    };

    function handleSkip() {
        navigate('/');
        setCurrentPage('');
    };

    return(
        <div className='mt-10 sm:p-5 bg-slate-100'>
            <main className='flex flex-col gap-5'>
                {isShowSelectedSkills && 
                    <ViewAllSkills 
                        selectedSkills={selectedSkills}
                        setIsShowSelectedSkills={setIsShowSelectedSkills}
                        submitSkills={submitSkills}
                    />
                }
                <h1 className='text-3xl font-bold'>Let's get you started</h1>
                    <Container 
                        skills={skills} 
                        isPickMatches={false} 
                        handleSkillAdd={handleLearnSkillAdd} 
                        selectedSkills={selectedSkills.toLearn} 
                        selectedOpposite={selectedSkills.toTeach}
                        contentHeader='Pick the skills you would like to learn' 
                    />     
                    <Container 
                        skills={skills} 
                        isPickMatches={false} 
                        handleSkillAdd={handleTeachSkillAdd} 
                        selectedSkills={selectedSkills.toTeach} 
                        selectedOpposite={selectedSkills.toLearn}
                        contentHeader='Pick the skills you would like to teach' 
                    />
                <div className='self-end flex gap-2.5 w-full'>
                    <Button 
                        styles='w-1/3 p-2.5 border bg-stone-950 text-white hover:bg-stone-900'
                        text='Skip'
                        handleOnClick={handleSkip}
                    />
                    <Button 
                        styles='w-1/3 p-2.5 border bg-stone-950 text-white hover:bg-stone-900'
                        text='View Selected Skills'
                        handleOnClick={() => setIsShowSelectedSkills(true)}
                    />
                    <Button 
                        handleOnClick={submitSkills}
                        styles='w-1/3 p-2.5 border bg-stone-950 text-white hover:bg-stone-900'
                        text='Submit'
                    />
                </div>
            </main>
        </div>
    );
}

export default InitialPickSkillsPage;