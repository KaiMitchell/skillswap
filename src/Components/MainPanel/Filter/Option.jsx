function FilterOption({ option, handleFilterValueClick, isSelectCategory }) {
    return(
        <div>
                <h3 
                    className='p-2.5 text-white text-sm hover:bg-stone-700 hover:cursor-pointer' 
                    onClick={() => handleFilterValueClick(option, isSelectCategory)}
                >
                    {option}
                </h3>
        </div>
    );
};

export default FilterOption;