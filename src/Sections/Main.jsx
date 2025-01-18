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
    setWhichFilter 
}) {   

    const [isToLearnProfiles, setIsToLearnProfiles] = useState(false);

    return(
        <main className='px-5 h-full sm:h-72'>
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
            />
        </main>
    );
};

export default Main;