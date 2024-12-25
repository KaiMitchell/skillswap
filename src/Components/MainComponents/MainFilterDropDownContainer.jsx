import { useState, useEffect } from 'react';
import MainFilterDropDownComponent from "./MainFilterDropDownComponent";

function MainFilterDropDownContainer() {
    const [filterValues, setFilterValues] = useState({
        toLearn: '',
        toTeach: '',
        yourGender: '',
        preferredGender: '',
        meetUp: ''
    });

    useEffect(() => {console.log(filterValues)}, [filterValues]);

    return(
        <div className='flex gap-2.5'>
            <MainFilterDropDownComponent setFilterValues={setFilterValues} filterValueKey='toLearn' filterTitle='You want to learn' />
            <MainFilterDropDownComponent setFilterValues={setFilterValues} filterValueKey='toTeach' filterTitle='You can teach' />
            <MainFilterDropDownComponent setFilterValues={setFilterValues} filterValueKey='yourGender' filterTitle='Your gender' />
            <MainFilterDropDownComponent setFilterValues={setFilterValues} filterValueKey='PreferredGender' filterTitle='Gender preference' />
            <MainFilterDropDownComponent setFilterValues={setFilterValues} filterValueKey='meetUp' filterTitle='Online / In Person' />
        </div>
    );
};

export default MainFilterDropDownContainer