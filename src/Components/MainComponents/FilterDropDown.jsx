import { useEffect, useRef } from 'react';

function FilterDropDown({ isShown, setIsShown, setFilterValues, filterValueKey, options }) {    

    let mappedOptions;

    if(filterValueKey === 'toLearn' || filterValueKey === 'toTeach') {
        mappedOptions = options.map(el => {
            return(
                <h3 className='p-5 text-sm hover:bg-stone-700 hover:cursor-pointer' key={el.category} onClick={() => handleFilterValueClick(el.category)}>{el.category}</h3>
            )
        });
    } else {
        mappedOptions = options.map(option => {
            return <p key={option} onClick={() => handleFilterValueClick(option)} className='p-5 hover:bg-stone-700 hover:cursor-pointer'>{option}</p>
        });
    };

    function handleFilterValueClick(value) {
        setFilterValues(prev => {
            const newObj = {...prev};
            for(const key in newObj) {
                newObj[filterValueKey] = value;
            };
            return newObj;
        });
        setIsShown(false);
    };

    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute w-full left-0 z-10 top-full h-72 bg-stone-900 rounded-lg hover:border shadow-xl shadow-black hover:border-white overflow-y-auto no-scrollbar`}>
            {mappedOptions}
        </div>
    );
};

export default FilterDropDown;