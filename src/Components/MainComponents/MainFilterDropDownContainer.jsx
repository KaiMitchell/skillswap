import { useState, useEffect } from 'react';
import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

function MainFilterDropDownContainer({ skills }) {
    const [isToLearnSkillsDropDown, setIsToLearnSkillsDropDown] = useState(false);
    const [isToTeachSkillsDropDown, setIsToTeachSkillsDropDown] = useState(false);
    const [filterValues, setFilterValues] = useState({
        toLearnCategory: '',
        toTeachCategory: '',
        toLearn: '',
        toTeach: '',
        yourGender: '',
        preferredGender: '',
        meetUp: ''
    });

    const filterTitles = ['Learning category', 'Teaching category', 'Your gender', 'Gender preference', 'Online / In Person'];
    const filterValueKeys = Object.keys(filterValues).filter(key => key !== 'toTeach' && key !== 'toLearn');

    useEffect(() => {
        console.log(filterValues);
        if(filterValues.toLearnCategory) {
            setIsToLearnSkillsDropDown(true);
        };
        if(filterValues.toTeachCategory) {
            setIsToTeachSkillsDropDown(true);
        };
    }, [filterValues]);


    return(
        <div className='w-full flex flex-col gap-2.5'>
            <div className='flex gap-2.5'>
                {filterValueKeys?.map((key, index) => {
                    return(
                        <MainFilterDropDownComponent key={key} skills={skills} filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey={key} filterTitle={filterTitles[index]} />
                    );
                })}
                {/* <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toLearnCategory' filterTitle='Learning category' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toTeachCategory' filterTitle='Teaching category' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='yourGender' filterTitle='Your gender' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='PreferredGender' filterTitle='Gender preference' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='meetUp' filterTitle='Online / In Person' /> */}
            </div>
            <div className='flex gap-2.5'>
                <div className={`${isToLearnSkillsDropDown ? 'opacity-100' : 'opacity-0'}`}>
                    <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toLearn' filterTitle={`${filterValues.toLearnCategory}`} isSkillsDropDown={true} />
                    <h2>To learn</h2>
                </div>
                <div className={`${isToTeachSkillsDropDown ? 'opacity-100' : 'opacity-0'}`}>
                    <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toTeach' filterTitle={`${filterValues.toTeachCategory}`} isSkillsDropDown={true} />
                    <h2>To teach</h2>
                </div>
            </div>
        </div>
    );
};

export default MainFilterDropDownContainer