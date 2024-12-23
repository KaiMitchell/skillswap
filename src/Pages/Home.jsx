import { Navigate } from "react-router-dom";
import Header from "../Sections/Header";
import Main from "../Sections/Main";


function Home() {
    return(
        <div className='bg-slate-100'>
            <Main />
        </div>
    );
}

export default Home;