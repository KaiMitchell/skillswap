import { useState, useEffect } from 'react';
import DropDownAnchor from "./DropDownAnchor";
import MainSkillsDropDownContainer from './Skills/AnchorContainer';

function Container({ headerFilter, whichFilter, setWhichFilter, skills, filter, setFilter }) {
    const [isToLearnSkillsDropDown, setIsToLearnSkillsDropDown] = useState(false);
    const [isToTeachSkillsDropDown, setIsToTeachSkillsDropDown] = useState(false);

    let filterValueKeys; 

    const dropDownTitles = [
        'Learning category', 
        'Teaching category', 
        'Your gender', 
        'Gender preference', 
        'Online / In Person'
    ];

    //return the keys of toTeach and toLearn from the mainFilter state to use for mapping.
    if(typeof filter === 'object' && filter !== null) {
        filterValueKeys = Object.keys(filter).filter(key => key !== 'toTeach' && key !== 'toLearn' && key !== 'isFilter' && key !== 'skill');
    };
    
    //only display the skill drop downs for learn and teach only if there category has been selected
    useEffect(() => {
        if(filter.toLearnCategory) {
            setIsToLearnSkillsDropDown(true);
        } else {
            setIsToLearnSkillsDropDown(false);
        };
        if(filter.toTeachCategory) {
            setIsToTeachSkillsDropDown(true);
        } else {
            setIsToTeachSkillsDropDown(false);
        };
    }, [filter]);

    return(
        <div className='w-full flex flex-col gap-2.5'>
            <div className='flex gap-2.5'>
                {filterValueKeys?.map((key, index) => {
                    return(
                        <DropDownAnchor 
                            key={key} 
                            skills={skills} 
                            whichFilter={whichFilter} 
                            headerFilter={headerFilter} 
                            setWhichFilter={setWhichFilter} 
                            filter={filter} setFilter={setFilter} 
                            filterValueKey={key} 
                            dropDownTitle={dropDownTitles[index]} 
                        />
                    );
                })}
            </div>

            <MainSkillsDropDownContainer 
                filter={filter} 
                setWhichFilter={setWhichFilter}
                skills={skills}
                setFilter={setFilter}
                isToLearnSkillsDropDown={isToLearnSkillsDropDown}
                isToTeachSkillsDropDown={isToTeachSkillsDropDown}
            />
        </div>
    );
};

export default Container