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
    const [filterType, setFilterType] = useState({learn: '', teach: ''});

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
        setFilterType({ learn: toLearnFilterHeader, teach: toTeachFilterHeader });
    }, [filter]);

    //Grab a unique value from the request matches click handler and set it as param state
    //to trigger a re render to update the UI

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
        profile${learnCount === 1 ? ' wants' : "'s want"}
        to `;

    const teachFilterInfo =     
        `
        ${teachCount === 0 ? 'No' : teachCount || 'No'} 
        profile${teachCount === 1 ? ' wants' : "'s want"}
        to `;

    if(isToLearnProfiles) {
        searchingFor = learnSearchFor;
    } else {
        searchingFor = teachSearchFor;
    };

    const learnSearchingByStr = 
        `
        Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.learn}
        `;

    const teachSearchingByStr = 
        `
        Searching by ${whichFilter.headerFilter ? 'SKILL' : filterType.teach}
        `;


    return(
        <div className={`w-full relative flex flex-col self-end bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 sm:p-2.5`}>
            <Button 
                styles={`${isMobileFilter ? 'bg-white' : 'bg-white/30'} flex justify-center text-xl w-20 py-2 self-end rounded-bl sm:hidden`}
                handleOnClick={() => setIsMobileFilter(!isMobileFilter)}  
                text='filter'             
            />
            <div className='relative flex flex-row-reverse justify-between py-2.5 gap-2.5 w-full'>
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
            <div className='relative flex flex-col gap-1 items-center sm:flex-row sm:gap-0'>
                <h3 className='text-center text-white text-xl'>{`${isToLearnProfiles ? learnFilterInfo : teachFilterInfo}`}</h3>
                <div className='flex w-fit mx-2 rounded-l rounded-r bg-white/20'>
                    <Button 
                        text={`learn`}
                        styles={`${isToLearnProfiles && 'font-bold bg-white'} rounded-l px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(true)}
                    />
                    <Button 
                        text={`teach`}
                        styles={`${!isToLearnProfiles && 'font-bold bg-white'} rounded-r px-4 py-2`}
                        handleOnClick={() => setIsToLearnProfiles(false)}
                    />
                </div>
                <h3 className='text-center text-white text-xl'>{searchingFor}</h3>
                <Button 
                    text='What is SkillSwap?'
                    styles={`absolute bottom-1 right-0 px-2.5 py-2 rounded-l text-xs bg-white/50 sm:rounded-none hover:bg-white/60`}
                />
            </div>
        </div>
    );
};

export default FilterPanel;