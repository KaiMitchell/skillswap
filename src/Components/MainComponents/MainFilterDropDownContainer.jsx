import { useState, useEffect } from 'react';
import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

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
            <div className='flex gap-2.5'>
                <div className={`${isToLearnSkillsDropDown ? 'opacity-100' : 'opacity-0'}`}>
                    <MainFilterDropDownComponent setWhichFilter={setWhichFilter} filter={filter} skills={skills} setFilter={setFilter} filterValueKey='toLearn' filterTitle={`${filter?.toLearnCategory}`} isSkillsDropDown={true} />
                    <h2>To learn</h2>
                </div>
                <div className={`${isToTeachSkillsDropDown ? 'opacity-100' : 'opacity-0'}`}>
                    <MainFilterDropDownComponent setWhichFilter={setWhichFilter} filter={filter} skills={skills} setFilter={setFilter} filterValueKey='toTeach' filterTitle={`${filter?.toTeachCategory}`} isSkillsDropDown={true} />
                    <h2>To teach</h2>
                </div>
            </div>
        </div>
    );
};

export default MainFilterDropDownContainer