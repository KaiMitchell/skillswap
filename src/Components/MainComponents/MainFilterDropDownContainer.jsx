import { useState, useEffect } from 'react';
import MainFilterDropDownComponent from "./MainFilterDropDownComponent";
import MainSkillsDropDownContainer from './MainSkillsDropDownContainer';

function MainFilterDropDownContainer({ setWhichFilter, skills, filter, setFilter }) {
    const [isToLearnSkillsDropDown, setIsToLearnSkillsDropDown] = useState(false);
    const [isToTeachSkillsDropDown, setIsToTeachSkillsDropDown] = useState(false);

    useEffect(() => {console.log('new filter: ', filter)}, [filter]);

    const filterTitles = ['Learning category', 'Teaching category', 'Your gender', 'Gender preference', 'Online / In Person'];
    let filterValueKeys; 
    if(typeof filter === 'object' && filter !== null) {
        filterValueKeys = Object.keys(filter).filter(key => key !== 'toTeach' && key !== 'toLearn' && key !== 'isFilter' && key !== 'skill');
    };
    
    useEffect(() => {
        if(filter.toLearnCategory) {
            setIsToLearnSkillsDropDown(true);
        };
        if(filter.toTeachCategory) {
            setIsToTeachSkillsDropDown(true);
        };
    }, [filter]);


    return(
        <div className='w-full flex flex-col gap-2.5'>
            <div className='flex gap-2.5'>
                {filterValueKeys?.map((key, index) => {
                    return(
                        <MainFilterDropDownComponent setWhichFilter={setWhichFilter} key={key} skills={skills} filter={filter} setFilter={setFilter} filterValueKey={key} filterTitle={filterTitles[index]} />
                    );
                })}
            </div>
            <MainSkillsDropDownContainer 
                filter={filter} 
                setWhichFilter={setWhichFilter}
                skills={skills}
                isToLearnSkillsDropDown={isToLearnSkillsDropDown}
                isToTeachSkillsDropDown={isToTeachSkillsDropDown}
            />
        </div>
    );
};

export default MainFilterDropDownContainer