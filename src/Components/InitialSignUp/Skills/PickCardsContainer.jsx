import PickSkillsCard from './Card';

function PickContainer({ handleSkillAdd, selectedSkills, isPickMatches, skills }) {  

  return(
    <div className='relative grid grid-cols-6 gap-5 h-96 p-5 bg-black max-w-full rounded-md'>
      {skills?.map((obj, index) => {   
          return(
              <PickSkillsCard  
                key={index}
                index={index}
                isPickMatches={isPickMatches}
                obj={obj}
                selectedSkills={selectedSkills}
                handleSkillAdd={handleSkillAdd}
              />
          );
      })};
    </div>
  );
};

export default PickContainer;