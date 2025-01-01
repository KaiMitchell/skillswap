import MainFilterSection from '../Components/MainComponents/MainFilterSection';
import MainProfileCardsSection from '../Components/MainComponents/MainProfileCardsSection';

function Main({ sentRequests, headerFilter, learnProfiles, teachProfiles, skills, setFilter, filter, whichFilter, setWhichFilter }) {   
    return(
        <main className='px-5 h-72'>
            <MainFilterSection whichFilter={whichFilter} headerFilter={headerFilter} setWhichFilter={setWhichFilter} setFilter={setFilter} filter={filter} skills={skills} />
            <MainProfileCardsSection sentRequests={sentRequests} filter={filter} learnProfiles={learnProfiles} teachProfiles={teachProfiles} whichFilter={whichFilter} />
        </main>
    );
};

export default Main;