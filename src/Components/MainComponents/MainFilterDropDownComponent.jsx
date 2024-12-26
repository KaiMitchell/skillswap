import { useState, useEffect, useRef } from 'react';
import FilterDropDown from './FilterDropDown.jsx';
import skills from '../../skillData/skills.js';

function MainFilterDropDownComponent({ filterTitle, filterValues, setFilterValues, filterValueKey }) {
    const [isShown, setIsShown] = useState(false);

    const node = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => document.removeEventListener('mousedown', handleOutSideClick);
    }, []);

    function handleOutSideClick(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsShown(false);
        };
    };

    let options = [];

    switch(filterTitle) {
        case 'You want to learn':
            options = skills;
            break;
        case 'You can teach':
            options = skills;
            break;
        case 'Your gender':
            options = ['Female', 'Male', 'Other'];
            break;
        case 'Gender preference':
            options = ['Femal', 'Male', 'Other'];
            break;
        case 'Online / In Person':
            options = ['Online', 'In Person'];
            break;
    };
    
    return(
        <div ref={node} onClick={() => {setIsShown(!isShown)}} className='relative h-16 w-1/5 px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 cursor-pointer'>
            <h3 className='text-xs mb-2.5'>{filterTitle}</h3>
            <p className='text-sm'>{filterValues[filterValueKey]}</p>
            <FilterDropDown filterValueKey={filterValueKey} isShown={isShown} setIsShown={setIsShown} setFilterValues={setFilterValues} options={options} />
        </div>
    );
};

export default MainFilterDropDownComponent;