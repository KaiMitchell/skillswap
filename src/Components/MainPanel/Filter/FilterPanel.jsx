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
        <div className='relative sm:h-full -mx-5 flex flex-col'>
            <Button 
                styles={`${isMobileFilter ? 'bg-white' : 'bg-white/30'} flex justify-center items-center text-xl w-fit self-end p-2.5 m-2.5 sm:hidden`}
                handleOnClick={() => setIsMobileFilter(!isMobileFilter)}  
                text='filter'             
            />
            <div className=' relative flex flex-row-reverse justify-between gap-2.5 w-full p-2.5 md:px-10'>
                <h1 className='hidden text-5xl self-center text-center pb-2.5 font-bold underline sm:block'>Skill Swap</h1>
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
            <div className='flex self-end w-fit mr-5 bg-white/20'>
                <Button 
                    text={`learning`}
                    styles={`${isToLearnProfiles && 'font-bold bg-white'} px-2 py-1`}
                    handleOnClick={() => setIsToLearnProfiles(true)}
                />
                <Button 
                    text={`teaching`}
                    styles={`${!isToLearnProfiles && 'font-bold bg-white'} px-2 py-1`}
                    handleOnClick={() => setIsToLearnProfiles(false)}
                />
            </div>
        </div>
    );
};

export default FilterPanel;