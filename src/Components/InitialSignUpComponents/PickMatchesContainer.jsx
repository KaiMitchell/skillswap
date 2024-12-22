import InitialMatchCard from "./InitialMatchCard";

function PickMatchesContainer({ matches }) {

    console.log('initial matches: ', matches);

    return(
      <div className='flex h-96 p-5 bg-black rounded-md'>
        {matches?.data?.map((item, index) => {   
            return(
              <InitialMatchCard key={index} item={item} index={index} />
            );
        })};
      </div>
    );
};

export default PickMatchesContainer;