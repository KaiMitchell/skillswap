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
    user,
    setWhichFilter,
    setIsSignInPrompt,
    isLoading,
}) {   
    const [isToLearnProfiles, setIsToLearnProfiles] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    return(
        <main className='px-5 h-full w-screen sm:h-72 mt-10'>
            <FilterPanel 
                whichFilter={whichFilter} 
                headerFilter={headerFilter} 
                setWhichFilter={setWhichFilter} 
                setFilter={setFilter} 
                filter={filter} 
                skills={skills} 
                setIsToLearnProfiles={setIsToLearnProfiles}
                isToLearnProfiles={isToLearnProfiles}
            />
            <CardPanel 
                user={user}
                requests={requests} 
                fetchRequests={fetchRequests}
                filter={filter} 
                learnProfiles={learnProfiles} 
                teachProfiles={teachProfiles} 
                whichFilter={whichFilter}
                headerFilter={headerFilter}
                isToLearnProfiles={isToLearnProfiles}
                isLoading={isLoading}
                setIsSignInPrompt={setIsSignInPrompt}
                setIsDisabled={setIsDisabled}
                isDisabled={isDisabled}
            />
        </main>
    );
};

export default Main;