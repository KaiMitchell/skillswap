import InitialMatchCard from "./InitialMatchCard";

function PickMatchesContainer() {
    const placeholder = [];

    for(let i = 0; i < 10; i++) {
        placeholder.push(i);
    };

    return(
      <div className='flex h-96 p-5 bg-black rounded-md'>
        {placeholder.map((item, index) => {   
            return(
              <InitialMatchCard key={index} item={item} index={index} array={placeholder} />
            );
        })};
      </div>
    );
};

export default PickMatchesContainer;