import { useEffect, useRef } from 'react';
import FilterSkill from './filterOption';
import { CategoryFilterDropDown, ExtraFilterDropDowns, SkillFilterDropDown } from './SkillFilterDropDown';

function FilterDropDown({ setWhichFilter, isShown, setIsShown, setFilter, filterValueKey, options, isSkillsDropDown, filterTitle }) {    
    let mappedOptions;

    if(filterValueKey === 'toLearnCategory' || filterValueKey === 'toTeachCategory') {
        //Drop down for the category options
        mappedOptions = <CategoryFilterDropDown
                            options={options} 
                            mappedOptions={mappedOptions} 
                            handleFilterValueClick={handleFilterValueClick} 
                            filterValueKey={filterValueKey}
                        />
    } else if(isSkillsDropDown) { 
        // Drop down for the skills options
        mappedOptions = <SkillFilterDropDown 
                            options={options} 
                            mappedOptions={mappedOptions} 
                            handleFilterValueClick={handleFilterValueClick} 
                            filterTitle={filterTitle} 
                        />
    } else {
        // Drop downs for extra options like 'gender, etc'
        mappedOptions = <ExtraFilterDropDowns 
                            options={options} 
                            mappedOptions={mappedOptions} 
                            handleFilterValueClick={handleFilterValueClick} 
                            filterValueKey={filterValueKey}
                        />
    };

    function handleFilterValueClick(value, isSelectCategory) {
        setFilter(prev => {
            const newObj = {...prev};
            for(const key in newObj) {
                //Clear the skills drop down value if new category is selected
                if(isSelectCategory) {
                    console.log(filterValueKey);
                    if(key === 'toLearn' && filterValueKey === 'toLearnCategory') {
                        newObj[key] = '';
                    };
                    if(key === 'toTeach' && filterValueKey === 'toTeachCategory') {
                        newObj[key] = '';
                    };
                };
                newObj[filterValueKey] = value;
            };
            return newObj;
        });
        setWhichFilter({ mainFilter: true, headerFilter: false });
        setIsShown(false);
    };

    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute w-full left-0 z-10 top-full h-72 bg-stone-900 rounded-lg hover:border shadow-xl shadow-black hover:border-white overflow-y-auto no-scrollbar`}>
            {mappedOptions}
        </div>
    );
};

export default FilterDropDown;