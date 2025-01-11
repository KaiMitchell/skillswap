import { CategoryFilterDropDown, ExtraFilterDropDowns, SkillFilterDropDown } from './Options';

function MainFilterDropDown({ 
    headerFilter, 
    whichFilter, 
    setWhichFilter, 
    isShown, 
    setIsShown, 
    setFilter, 
    filterValueKey, 
    options, 
    isSkillsDropDown, 
    dropDownTitle 
}) {    

    let mappedOptions;

    //these 3 drop downs will return a mapped list of options that will be stored in the mappedOptions variable
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
                            dropDownTitle={dropDownTitle} 
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

            const newObj = { ...prev };

            for(const key in newObj) {

                //Clear the skills drop down value if new category is selected
                if(isSelectCategory) {

                    //clear skill filter when selecting a new category
                    if(key === 'toLearn' && filterValueKey === 'toLearnCategory') {
                        newObj[key] = '';
                    };

                    if(key === 'toTeach' && filterValueKey === 'toTeachCategory') {
                        newObj[key] = '';
                    };

                    //pass the skill assigned to the header filter to the main skill filter 
                    //to prevent unwelcome profile renderring issues
                    if(filterValueKey === 'toTeachCategory' && whichFilter.headerFilter) {
                        newObj['toLearnCategory'] = headerFilter?.category;
                        newObj['toLearn'] = [headerFilter?.skill];
                    };

                    //TODO: Fix issue with this code not working when selecting category from learning
                    if(filterValueKey === 'toLearnCategory' && whichFilter.headerfilter) {
                        console.log('what is the filterValueKey?: ', filterValueKey);
                        newObj['toTeachCategory'] = headerFilter?.category;
                        newObj['toTeach'] = [headerFilter?.skill];
                    };
                };

                newObj[filterValueKey] = value;
            };
            return newObj;
        });

        //transition from using the headers filters to main filters
        setWhichFilter({ mainFilter: true, headerFilter: false });
        setIsShown(false);
    };

    return(
        <div className={`${isShown ? 'block' : 'hidden'} absolute w-full left-0 z-10 top-full h-72 font-normal bg-white rounded-lg shadow-xl shadow-black overflow-y-auto no-scrollbar`}>
            {mappedOptions}
        </div>
    );
};

export default MainFilterDropDown;