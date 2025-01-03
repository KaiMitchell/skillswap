import { Container } from "postcss";
import PickMatchesContainer from "./Matches/PickContainer";
import PickSkillsContainer from "./Skills/PickContainer";

function Container({ matches, skills, isPickMatches, handleSkillAdd, selectedSkills, contentHeader }) {
    return(
        <div className='h-1/2'>
        <h2 className='text-2xl'>{contentHeader}</h2>
            {isPickMatches ? <PickMatchesContainer matches={matches} /> : <PickSkillsContainer isPickMatches={isPickMatches} handleSkillAdd={handleSkillAdd} selectedSkills={selectedSkills} skills={skills} />} 
        </div>
    );
};

export default Container;