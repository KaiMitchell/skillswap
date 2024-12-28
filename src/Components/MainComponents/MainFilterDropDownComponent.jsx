import { useState, useEffect, useRef } from 'react';
import FilterDropDown from './FilterDropDown.jsx';

function MainFilterDropDownComponent({ skills, filterTitle, filterValues, setFilterValues, filterValueKey, isSkillsDropDown }) {
    const [isShown, setIsShown] = useState(false);

    const node = useRef();
    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => document.removeEventListener('mousedown', handleOutSideClick);
    }, []);

    function handleOutSideClick(e) {
        if(node.current && !node.current.contains(e.target) ) {
            setIsShown(false);
        };
    };

    let options = [];

    switch(filterValueKey) {
        case 'toLearnCategory':
        case 'toTeachCategory':
            if(Array.isArray(skills) && skills.length > 0) {
                options = skills;
            };
            break;
        case 'yourGender':
            options = ['Female', 'Male', 'Other'];
            break;  
        case 'preferredGender':
            options = ['Femal', 'Male', 'Other'];
            break;
        case 'meetUp':
            options = ['Online', 'In Person'];
            break;
    };

    if(isSkillsDropDown) {
        options = skills;
    }

    return(
        <div ref={node} onClick={() => {setIsShown(!isShown)}} className='relative min-h-20 h-fit w-44 px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 cursor-pointer'>
            <h3 className='text-xs mb-2.5'>{filterTitle}</h3>
            <p className='text-sm'>{filterValues[filterValueKey]}</p>
            <FilterDropDown filterValueKey={filterValueKey} isShown={isShown} setIsShown={setIsShown} setFilterValues={setFilterValues} options={options} isSkillsDropDown={isSkillsDropDown} filterTitle={filterTitle} />
        </div>
    );
};

export default MainFilterDropDownComponent;