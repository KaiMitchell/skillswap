import MainSearchSection from '../Components/MainComponents/MainSearchComponent';
import MainProfileCardsSection from '../Components/MainComponents/MainProfileCardsSection';

function Main({ profiles, skills }) {   
    return(
        <main className='px-5 h-72'>
            <MainSearchSection  skills={skills} />
            <MainProfileCardsSection profiles={profiles} />
        </main>
    );
};

export default Main;