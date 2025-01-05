function FilterOption({ option, handleFilterValueClick, isSelectCategory }) {
    return(
        <div>
                <h3 
                    className='p-2.5 text-sm hover:bg-zinc-100 hover:font-bold hover:cursor-pointer' 
                    onClick={() => handleFilterValueClick(option, isSelectCategory)}
                >
                    {option}
                </h3>
        </div>
    );
};

export default FilterOption;