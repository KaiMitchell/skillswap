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
    const [param, setParam] = useState(false);//Trigger useEffect to re render page with updated requests.


    function reMount(param) {
        setParam(() => param);
    };

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
                user={user}
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
                reMount={reMount}
                learnProfiles={learnProfiles} 
                teachProfiles={teachProfiles} 
                param={param}
            />
        </main>
    );
};

export default Main;