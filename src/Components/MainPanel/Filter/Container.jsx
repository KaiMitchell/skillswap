import { useState, useEffect } from 'react';
import DropDownAnchor from "./DropDownAnchor";
import MainSkillsDropDownContainer from './Skills/AnchorContainer';
import MapData from '../../../features/methods/MapData';
import MainSkillDropDown from './Skills/SkillsDropDownAnchor';

function Container({ 
    headerFilter, 
    whichFilter, 
    setWhichFilter, 
    skills, 
    filter, 
    setFilter, 
    isMobileFilter 
}) {
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

    //PASS PROP FOR A CONDITIONAL TO RENDER FILTERS ON MOBILE SIZE

    return(
        <div className={`${!isMobileFilter && 'hidden'} sm:block w-full flex flex-col gap-2.5`}>
            <div className='flex flex-col sm:flex-row gap-2.5'>
                <MapData
                    data={filterValueKeys}
                    render={(key, index) => {
                        //display skill filter under it's category
                        const isLearningCategory = key === 'toLearnCategory';
                        const isTeachingCategory = key === 'toTeachCategory';

                        return(
                            <div key={key}>
                                <DropDownAnchor 
                                    skills={skills} 
                                    whichFilter={whichFilter} 
                                    headerFilter={headerFilter} 
                                    setWhichFilter={setWhichFilter} 
                                    filter={filter} 
                                    setFilter={setFilter} 
                                    filterValueKey={key} 
                                    dropDownTitle={dropDownTitles[index]} 
                                />
                                {isLearningCategory && 
                                    <div className='sm:hidden'>
                                        <MainSkillDropDown 
                                            type={'to Learn'} 
                                            isMobile={true}
                                            dropDownTitle={`${filter?.toLearnCategory || 'select a skill to learn'}`}
                                            isSkillsDropDown={isToLearnSkillsDropDown}
                                            filter={filter}
                                            setWhichFilter={setWhichFilter}
                                            skills={skills}
                                            setFilter={setFilter}
                                            filterValueKey={'toLearn'}
                                        />
                                    </div>
                                }
                                {isTeachingCategory && 
                                    <div className='sm:hidden'>
                                        <MainSkillDropDown 
                                            type={'to Teach'} 
                                            isMobile={true}
                                            dropDownTitle={`${filter?.toTeachCategory || 'select a skill to teach'}`}
                                            isSkillsDropDown={isToTeachSkillsDropDown}
                                            filter={filter}
                                            setWhichFilter={setWhichFilter}
                                            skills={skills}
                                            setFilter={setFilter}
                                            filterValueKey={'toTeach'}
                                        />
                                    </div>
                                }
                            </div>
                    )}}
                />
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