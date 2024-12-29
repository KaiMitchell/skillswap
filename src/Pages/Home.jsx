import Main from "../Sections/Main";

function Home({ learnProfiles, teachProfiles, skills, isFiltered, filter, setFilter, whichFilter, setWhichFilter }) {
    return(
        <div className='bg-slate-100'>
            <Main setWhichFilter={setWhichFilter} learnProfiles={learnProfiles} teachProfiles={teachProfiles} skills={skills} filter={filter} whichFilter={whichFilter} setFilter={setFilter} isFiltered={isFiltered} />
        </div>
    );
}

export default Home;