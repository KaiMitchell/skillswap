import PickSkillsCard from './Card';

function PickContainer({ 
  handleSkillAdd, 
  selectedSkills, 
  isPickMatches, 
  skills,
  selectedOpposite, 
}) {  

  return(
    <div className='relative grid grid-cols-1 sm:grid-cols-3 gap-5 h-fit p-5 bg-black max-w-full rounded-md'>
      {skills?.map((obj, index) => {   
          return(
              <PickSkillsCard  
                key={index}
                index={index}
                isPickMatches={isPickMatches}
                obj={obj}
                selectedSkills={selectedSkills}
                handleSkillAdd={handleSkillAdd}
                selectedOpposite={selectedOpposite}
              />
          );
      })};
    </div>
  );
};

export default PickContainer;