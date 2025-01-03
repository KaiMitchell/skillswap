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
    setWhichFilter 
}) {   
    return(
        <main className='px-5 h-72'>
            <FilterPanel 
                whichFilter={whichFilter} 
                headerFilter={headerFilter} 
                setWhichFilter={setWhichFilter} 
                setFilter={setFilter} 
                filter={filter} 
                skills={skills} 
            />
            <CardPanel 
                requests={requests} 
                fetchRequests={fetchRequests}
                filter={filter} 
                learnProfiles={learnProfiles} 
                teachProfiles={teachProfiles} 
                whichFilter={whichFilter} 
            />
        </main>
    );
};

export default Main;