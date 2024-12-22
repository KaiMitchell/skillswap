import PickMatchesContainer from "./PickMatchesContainer";
import PickSkillsContainer from "./PickSkillsContainer";

function InitialCardsContainer({ matches, isPickMatches, handleSkillAdd, selectedSkills, contentHeader }) {
    return(
        <div className='h-1/2'>
        <h2 className='text-2xl'>{contentHeader}</h2>
            {isPickMatches ? <PickMatchesContainer matches={matches} /> : <PickSkillsContainer isPickMatches={isPickMatches} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} />} 
        </div>
    );
};

export default InitialCardsContainer;