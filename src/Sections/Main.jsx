import MainSearchSection from '../Components/MainComponents/MainSearchComponent';
import MainProfileCardsSection from '../Components/MainComponents/MainProfileCardsSection';

function Main({ profiles, skills, setFilter, filter, whichFilter, setWhichFilter }) {   
    return(
        <main className='px-5 h-72'>
            <MainSearchSection setWhichFilter={setWhichFilter} setFilter={setFilter} filter={filter} skills={skills} />
            <MainProfileCardsSection profiles={profiles} whichFilter={whichFilter} />
        </main>
    );
};

export default Main;