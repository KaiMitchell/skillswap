import MainSearchSection from '../Components/MainComponents/MainSearchComponent';
import MainProfileCardsSection from '../Components/MainComponents/MainProfileCardsSection';

function Main({ profiles }) {   

    return(
        <main className='px-5 h-64'>
            <MainSearchSection />
            <MainProfileCardsSection profiles={profiles} />
        </main>
    );
};

export default Main;