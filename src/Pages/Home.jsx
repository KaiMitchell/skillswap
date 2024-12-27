import Main from "../Sections/Main";

function Home({ profiles }) {
    return(
        <div className='bg-slate-100'>
            <Main profiles={profiles} />
        </div>
    );
}

export default Home;