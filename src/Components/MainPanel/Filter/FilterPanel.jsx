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

    return(
        <div className={`${isMobileFilter ? 'w-full' : 'w-fit'} relative flex flex-col self-end bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 sm:p-2.5 sm:w-full sm:h-full`}>
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
        </div>
    );
};

export default FilterPanel;