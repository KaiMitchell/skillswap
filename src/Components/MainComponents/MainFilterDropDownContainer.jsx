import { useState, useEffect } from 'react';
import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

function MainFilterDropDownContainer() {
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
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toLearnCategory' filterTitle='Learning category' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toTeachCategory' filterTitle='Teaching category' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='yourGender' filterTitle='Your gender' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='PreferredGender' filterTitle='Gender preference' />
                <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='meetUp' filterTitle='Online / In Person' />
            </div>
            <div className='flex gap-2.5'>
                {isToLearnSkillsDropDown && <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toLearn' filterTitle={`${filterValues.toLearnCategory}`} isSkillsDropDown={true} />}
                {isToTeachSkillsDropDown && <MainFilterDropDownComponent filterValues={filterValues} setFilterValues={setFilterValues} filterValueKey='toTeach' filterTitle={`${filterValues.toTeachCategory}`} isSkillsDropDown={true} />}
            </div>
        </div>
    );
};

export default MainFilterDropDownContainer