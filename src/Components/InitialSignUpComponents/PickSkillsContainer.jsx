import { useState, useEffect } from 'react';
import PickSkillsCard from './PickSkillsCard';

const backendURL = 'localhost:3000';

function PickSkillsContainer({ handleSkillAdd, selectedSkills, isPickMatches }) {  
  const [skills, setSkills] = useState();

  useEffect(() => {
    fetchSkills();
  }, []);
    
  async function fetchSkills() {
    const response = await fetch(`http://localhost:3000/fetch-skills`);
    const data = await response.json();
    if(Array.isArray(data.data) && data.data.length > 0) {
      setSkills(data.data);
    };
  };

  return(
    <div className='relative flex h-96 p-5 bg-black max-w-full rounded-md overflow-x-auto'>
      {skills?.map((obj, index) => {   
          return(
              <PickSkillsCard  key={index}  index={index} isPickMatches={isPickMatches} obj={obj} selectedSkills={selectedSkills} handleSkillAdd={handleSkillAdd} />
          );
      })}
    </div>
  );
};

export default PickSkillsContainer;