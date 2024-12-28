function FilterOption({ option, handleFilterValueClick }) {
    return(
        <div>
                <h3 className='p- text-white text-sm hover:bg-stone-700 hover:cursor-pointer' onClick={() => handleFilterValueClick(option)}>
                    {option}
                </h3>
        </div>
    );
};

export default FilterOption;