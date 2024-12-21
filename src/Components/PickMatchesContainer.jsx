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
                <div key={index} className='h-full hover:w-full'>
                    <InitialMatchCard item={item} index={index} placeholder={placeholder} />
                </div>
            );
        })};
      </div>
    );
};

export default PickMatchesContainer;