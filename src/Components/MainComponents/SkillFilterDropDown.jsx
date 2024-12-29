import FilterOption from "./filterOption";

function SkillFilterDropDown({ options, handleFilterValueClick, mappedOptions, filterTitle }) {
    options?.map((obj) => {
        if(obj.category === filterTitle) {
            mappedOptions = obj.skills?.map((skill, index) => {
                return(
                    <FilterOption key={index} option={skill} handleFilterValueClick={handleFilterValueClick} />
                );
            });
        };
    });
    return mappedOptions;
};

function CategoryFilterDropDown({ options, handleFilterValueClick, filterValueKey, mappedOptions }) {
    mappedOptions = options?.map((obj, index) => {
        return(
            <FilterOption key={index} option={obj.category} handleFilterValueClick={handleFilterValueClick} isSelectCategory={true} filterValueKey={filterValueKey} />
        );
    });
    return mappedOptions;
};

function ExtraFilterDropDowns({ options, handleFilterValueClick, mappedOptions }) {
    mappedOptions = options?.map((option) => {
        return <p key={option} onClick={() => handleFilterValueClick(option)} className='p-5 hover:bg-stone-700 hover:cursor-pointer'>{option}</p>
    });
    return mappedOptions;
};

export {
    SkillFilterDropDown,
    CategoryFilterDropDown,
    ExtraFilterDropDowns
};