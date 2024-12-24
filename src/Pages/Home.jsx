import { Navigate } from "react-router-dom";
import Header from "../Sections/Header";
import Main from "../Sections/Main";


function Home({ profiles }) {
    return(
        <div className='bg-slate-100'>
            <Main profiles={profiles} />
        </div>
    );
}

export default Home;