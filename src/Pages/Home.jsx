import { Navigate } from "react-router-dom";
import Header from "../Sections/Header";
import Main from "../Sections/Main";


function Home({ user }) {
    return(
        <div className='bg-slate-100'>
            <Main user={user} />
        </div>
    );
}

export default Home;