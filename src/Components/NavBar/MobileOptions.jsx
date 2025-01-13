import { Link } from "react-router-dom";
import Button from "../../commonComponents/Button";
import StandardSVG from "../../commonComponents/StandardSVG";

function MobileOptions({ isNavDropDown, setIsNavDropDown, fetchProfiles }) {

    //rotate burger icon when active
    const rotate = isNavDropDown ? 'origin-center rotate-90' : '';

    return(
        <>
            {/* Home icon */}
            <Link to='/' onClick={fetchProfiles} className='flex items-center p-2.5 text-white bg-stone-950 hover:bg-stone-700'>
                <StandardSVG dAttribute="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> 
            </Link>

            {/* Burger icon for mobile */}
            <Button
                handleOnClick={() => setIsNavDropDown(!isNavDropDown)}
                styles={`${rotate} sm:hidden text-white px-2.5 bg-stone-950`}
                text={
                    <StandardSVG 
                        dAttribute='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                    />
                }
            />
        </>
    );
};

export default MobileOptions;