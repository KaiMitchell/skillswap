import Main from "../Sections/Main";

function Home({ profiles, skills }) {
    return(
        <div className='bg-slate-100'>
            <Main profiles={profiles} skills={skills} />
        </div>
    );
}

export default Home;