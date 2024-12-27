import { useEffect, useRef } from 'react';
import FilterSkill from './filterOption';

function FilterDropDown({ isShown, setIsShown, setFilterValues, filterValueKey, options, isSkillsDropDown, filterTitle }) {    

    let mappedOptions;
    if(filterValueKey === 'toLearnCategory' || filterValueKey === 'toTeachCategory') {
        mappedOptions = options.map(el => {
            return(
                <FilterSkill key={el.category} option={el.category} handleFilterValueClick={handleFilterValueClick} />
            )
        });
    } else if(isSkillsDropDown) {
        mappedOptions = options?.map(obj => {
            if(obj.category === filterTitle) {
                console.log(obj);
                return(
                    obj.skills.map(skill => <FilterSkill key={skill} option={skill} handleFilterValueClick={handleFilterValueClick} />)
                )
            };
        });
    } else {
        mappedOptions = options.map(option => {
            return <p key={option} onClick={() => handleFilterValueClick(option)} className='p-5 hover:bg-stone-700 hover:cursor-pointer'>{option}</p>
        });
    };

    function handleFilterValueClick(value) {
        setFilterValues(prev => {
            const newObj = {...prev};
            for(const key in newObj) {
                newObj[filterValueKey] = value;
            };
            return newObj;
        });
        setIsShown(false);
    };

    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute w-full left-0 z-10 top-full h-72 bg-stone-900 rounded-lg hover:border shadow-xl shadow-black hover:border-white overflow-y-auto no-scrollbar`}>
            {mappedOptions}
        </div>
    );
};

export default FilterDropDown;