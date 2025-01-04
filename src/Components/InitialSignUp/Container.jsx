import PickMatchesContainer from "./Matches/PickMatchesContainer";
import PickSkillsContainer from "./Skills/PickCardsContainer";

function Container({ matches, skills, isPickMatches, handleSkillAdd, selectedSkills, contentHeader }) {
    return(
        <div className='h-1/2'>
        <h2 className='text-2xl'>{contentHeader}</h2>
            {isPickMatches ? <PickMatchesContainer matches={matches} /> : <PickSkillsContainer isPickMatches={isPickMatches} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} skills={skills} />} 
        </div>
    );
};

export default Container;