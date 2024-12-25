import { useState } from 'react';
import FilterDropDown from './FilterDropDown.jsx';

function MainFilterDropDownComponent({ filterTitle, setFilterValues, filterValueKey }) {
    const [isShown, setIsShown] = useState(false);

    return(
        <div onClick={() => setIsShown(true)} className='relative px-5 py-2.5 w-1/5 rounded-lg bg-stone-900 text-stone-200'>
            {/* you would like to learn: will display all profiles teaching skills under that category */}
            {/* renders a drop down with options for category or specific skill */}
            <h3 className='text-xs mb-2.5'>{filterTitle}</h3>
            <p className='text-sm'></p>
            <FilterDropDown filterValueKey={filterValueKey} isShown={isShown} setIsShown={setIsShown} setFilterValues={setFilterValues} />
        </div>
    );
};

export default MainFilterDropDownComponent;