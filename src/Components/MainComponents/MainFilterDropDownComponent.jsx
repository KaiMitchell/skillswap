import { useState, useEffect, useRef } from 'react';
import MainFilterDropDown from './MainFilterDropDown.jsx';

function MainFilterDropDownComponent({ 
    headerFilter, 
    whichFilter, 
    setWhichFilter, 
    skills, 
    dropDownTitle, 
    filter, 
    setFilter, 
    filterValueKey, 
    isSkillsDropDown 
}) {
    const [isShown, setIsShown] = useState(false);

    const node = useRef();
    let options = [];

    //remove drop down for main filters
    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
        return () => document.removeEventListener('mousedown', handleOutSideClick);
    }, []);

    function handleOutSideClick(e) {
        if(node.current && !node.current.contains(e.target) ) {
            console.log('clicked outside');
            setIsShown(false);
        };
    };

    //assign appropriate options to each filter
    switch(filterValueKey) {
        case 'toLearnCategory':
        case 'toTeachCategory':
            //assign skills from profiles fetched from database
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

    //assign skills fetched from database
    if(isSkillsDropDown) {
        options = skills;
    };

    return(
        <div ref={node} onClick={() => {setIsShown(!isShown)}} className='relative min-h-20 h-fit w-44 px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 cursor-pointer'>
            <h3 className='text-xs mb-2.5'>{dropDownTitle}</h3>
            <p className='text-sm'>{filter[filterValueKey]}</p>
            <MainFilterDropDown 
                whichFilter={whichFilter} 
                headerFilter={headerFilter} 
                setWhichFilter={setWhichFilter} 
                filterValueKey={filterValueKey} 
                isShown={isShown} setIsShown={setIsShown} 
                setFilter={setFilter} options={options} 
                isSkillsDropDown={isSkillsDropDown} 
                dropDownTitle={dropDownTitle} 
            />
        </div>
    );
};

export default MainFilterDropDownComponent;