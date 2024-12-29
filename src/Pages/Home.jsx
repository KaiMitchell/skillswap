import Main from "../Sections/Main";

function Home({ profiles, skills, isFiltered, filter, setFilter, whichFilter, setWhichFilter }) {
    return(
        <div className='bg-slate-100'>
            <Main setWhichFilter={setWhichFilter} profiles={profiles} skills={skills} filter={filter} whichFilter={whichFilter} setFilter={setFilter} isFiltered={isFiltered} />
        </div>
    );
}

export default Home;