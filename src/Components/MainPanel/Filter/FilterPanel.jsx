import { useState } from "react";
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
}) {
    const [isMobileFilter, setIsMobileFilter] = useState(false);

    // function toggleMobileFilters() {

    // };

    return(
        <div className='relative sm:h-full -mx-5 flex flex-col'>
            <div className='relative p-5 md:px-10'>
                <h1 className='text-4xl pb-2.5 font-bold underline'>Skill Swap</h1>
                <Button 
                    styles='absolute right-5 top-5 sm:hidden text-xl'
                    handleOnClick={() => setIsMobileFilter(!isMobileFilter)}  
                    text='filter'             
                />
                <MainFilterDropDownContainer 
                    whichFilter={whichFilter} 
                    headerFilter={headerFilter} 
                    setWhichFilter={setWhichFilter} 
                    setFilter={setFilter} 
                    filter={filter} 
                    skills={skills}
                    isMobileFilter={isMobileFilter} 
                    setIsToLearnProfiles={setIsToLearnProfiles}
                />
            </div>
            <div className='flex gap-2.5 ml-5'>
                <Button 
                    text={`learning`}
                    styles={`${isToLearnProfiles && 'font-bold'} bg-white`}
                    handleOnClick={() => setIsToLearnProfiles(true)}
                />
                <Button 
                    text={`teaching`}
                    styles={`${!isToLearnProfiles && 'font-bold'} bg-white`}
                    handleOnClick={() => setIsToLearnProfiles(false)}
                />
            </div>
        </div>
    );
};

export default FilterPanel;