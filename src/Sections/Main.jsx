import { useState } from 'react';
import FilterPanel from '../Components/MainPanel/Filter/FilterPanel';
import CardPanel from '../Components/MainPanel/Cards/CardPanel';

function Main({ 
    requests, 
    fetchRequests,
    headerFilter, 
    learnProfiles, 
    teachProfiles, 
    skills, 
    setFilter, 
    filter, 
    whichFilter, 
    setWhichFilter,
    setIsSignInPrompt,
    isLoading,
    remount
}) {   
    const [isToLearnProfiles, setIsToLearnProfiles] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    return(
        <main className='flex flex-col h-full w-screen sm:h-72'>
            <FilterPanel 
                whichFilter={whichFilter} 
                headerFilter={headerFilter} 
                setWhichFilter={setWhichFilter} 
                setFilter={setFilter} 
                filter={filter} 
                skills={skills} 
                setIsToLearnProfiles={setIsToLearnProfiles}
                isToLearnProfiles={isToLearnProfiles}
                learnProfiles={learnProfiles} 
                teachProfiles={teachProfiles} 
            />
            <CardPanel 
                requests={requests} 
                fetchRequests={fetchRequests}
                filter={filter} 
                whichFilter={whichFilter}
                headerFilter={headerFilter}
                isToLearnProfiles={isToLearnProfiles}
                isLoading={isLoading}
                setIsSignInPrompt={setIsSignInPrompt}
                setIsDisabled={setIsDisabled}
                setIsToLearnProfiles={setIsToLearnProfiles}
                isDisabled={isDisabled}
                learnProfiles={learnProfiles} 
                teachProfiles={teachProfiles} 
                remount={remount}
            />
        </main>
    );
};

export default Main;