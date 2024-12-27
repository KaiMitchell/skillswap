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
    if(data.data.length === 0) {
      console.error(data)
      return;
    };
    setSkills(data.data);
  };

  return(
    <div className='relative grid grid-cols-6 gap-5 h-96 p-5 bg-black max-w-full rounded-md'>
      {skills?.map((obj, index) => {   
          return(
              <PickSkillsCard  key={index}  index={index} isPickMatches={isPickMatches} obj={obj} selectedSkills={selectedSkills} handleSkillAdd={handleSkillAdd} />
          );
      })};
    </div>
  );
};

export default PickSkillsContainer;