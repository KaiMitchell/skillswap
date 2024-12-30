import Main from "../Sections/Main";

function Home({ headerFilter, learnProfiles, teachProfiles, skills, isFiltered, filter, setFilter, whichFilter, setWhichFilter }) {
    return(
        <div className='bg-slate-100'>
            <Main headerFilter={headerFilter} setWhichFilter={setWhichFilter} learnProfiles={learnProfiles} teachProfiles={teachProfiles} skills={skills} filter={filter} whichFilter={whichFilter} setFilter={setFilter} isFiltered={isFiltered} />
        </div>
    );
}

export default Home;