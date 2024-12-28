import Main from "../Sections/Main";

function Home({ profiles, skills, isFiltered }) {
    return(
        <div className='bg-slate-100'>
            <Main profiles={profiles} skills={skills} isFiltered={isFiltered} />
        </div>
    );
}

export default Home;