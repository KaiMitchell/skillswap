import { useState, useEffect } from "react";
import Button from "../../../commonComponents/Button";
import MainFilterDropDownContainer from "./Container";

function FilterPanel({ 
    headerFilter, 
    whichFilter, 
    setWhichFilter, 
    skills, 
    setFilter, 
    filter,
    setIsToLearnProfiles,
    isToLearnProfiles,
    learnProfiles,
    teachProfiles,
}) {
    const [isMobileFilter, setIsMobileFilter] = useState(false);
    //state to dynaically render text indicating the currently applied filter
    // const [filterType, setFilterType] = useState({learn: '', teach: ''});

    useEffect(() => {
        let toLearnFilterHeader;
        let toTeachFilterHeader;

        //label the filter type while filtering profiles
        if(filter.toTeachCategory && !filter.toTeach) {
            toTeachFilterHeader = 'CATEGORY';
        } else if(filter.toTeach) {
            toTeachFilterHeader = 'SKILL';    
        } else {
            toTeachFilterHeader = 'ALL';
        };
        
        if(filter.toLearnCategory && !filter.toLearn) {
            toLearnFilterHeader = 'CATEGORY';
        } else if(filter.toLearn) {
            toLearnFilterHeader = 'SKILL';
        } else {
            toLearnFilterHeader = 'ALL';
        };
        // setFilterType({ learn: toLearnFilterHeader, teach: toTeachFilterHeader });
    }, [filter]);

    //indicator to the ammount of profiles that want to learn or teach the filtered skill
    const learnCount = learnProfiles?.length;
    const teachCount = teachProfiles?.length;
    let learnSearchFor = '';
    let teachSearchFor = '';
    
    if(whichFilter.headerFilter) {
        //render in text the current header filter that is applied to the search
        learnSearchFor = headerFilter.skill && headerFilter.skill;
        teachSearchFor = headerFilter.skill && headerFilter.skill;
    } else if(whichFilter.mainFilter) {
        //render in text the skill or categories that are currently filtered in
        learnSearchFor = filter.toLearnCategory ? filter.toLearn :  filter.toLearnCategory;
        teachSearchFor = filter.toTeach ? filter.toTeach :  filter.toTeachCategory;
    };

    //display the cat or skill user is searching for
    let searchingFor = '';

    //ensure string does not render 'undefined profiles want to learn'
    const learnFilterInfo = 
        `
        ${learnCount === 0 ? 'No' : learnCount || 'No'} 
        Profile${learnCount === 1 ? ' Wants' : "s Want"}
        to `;

    const teachFilterInfo =     
        `
        ${teachCount === 0 ? 'No' : teachCount || 'No'} 
        Profile${teachCount === 1 ? ' Wants' : "s Want"}
        to `;

    if(isToLearnProfiles) {
        searchingFor = learnSearchFor;
    } else {
        searchingFor = teachSearchFor;
    };

    //not sure if i want to implement
    // const learnSearchingByStr = 
    //     `
    //     Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.learn}
    //     `;

    // const teachSearchingByStr = 
    //     `
    //     Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.teach}
    //     `;


    return(
        <div className={`w-full relative flex flex-col self-end pt-[60px] bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400`}>
            <div className='flex justify-between'>
                <Button 
                    text='What is SkillSwap?'
                    styles={`px-2.5 py-2 w-fit rounded-br text-xs bg-white/30 sm:rounded-none hover:bg-white/60`}
                />
                <Button 
                    styles={`${isMobileFilter ? 'bg-white' : 'bg-white/30'} flex justify-center text-xl w-20 py-2 rounded-bl hover:bg-white/60 sm:hidden`}
                    handleOnClick={() => setIsMobileFilter(!isMobileFilter)}  
                    text='filter'             
                />
            </div>
            <div className='relative flex flex-row-reverse justify-between p-2.5 gap-2.5 w-full'>
                <h1 className='hidden text-5xl self-center text-right pb-2.5 font-bold underline sm:block'>Skill Swap</h1>
                <MainFilterDropDownContainer 
                    whichFilter={whichFilter} 
                    headerFilter={headerFilter} 
                    setWhichFilter={setWhichFilter} 
                    setFilter={setFilter} 
                    filter={filter} 
                    skills={skills}
                    isMobileFilter={isMobileFilter} 
                    setIsToLearnProfiles={setIsToLearnProfiles}
                    isToLearnProfiles={isToLearnProfiles}
                />
            </div>
            {/* mobile description */}
            <div className='self-center text-3xl font-bold text-center sm:hidden'>
                <h1>Swap Skills</h1>
                <h1>Grow Together</h1>
            </div>
            {/* <h2 className='text-center text-white text-2xl font-bold sm:text-left'>{isToLearnProfiles ? learnSearchingByStr : teachSearchingByStr}</h2> */}
            <div className='relative flex flex-col items-center ml-2.5 sm:flex-row sm:gap-0'>
                <h3 className='text-center text-white text-xl'>{`${isToLearnProfiles ? learnFilterInfo : teachFilterInfo}`}</h3>
                <div className='flex w-fit mx-2 mt-1 rounded-t rounded-b-none bg-white/20 sm:mt-0'>
                    <Button 
                        text={`Learn`}
                        styles={`${isToLearnProfiles && 'font-bold bg-white'} rounded-tl px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(true)}
                    />
                    <Button 
                        text={`Teach`}
                        styles={`${!isToLearnProfiles && 'font-bold bg-white'} rounded-tr px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(false)}
                    />
                </div>
                <h3 className='text-center text-white text-xl'>{searchingFor}</h3>
            </div>
        </div>
    );
};

export default FilterPanel;