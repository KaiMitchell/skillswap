import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../commonComponents/Button";
import StandardSVG from "../../commonComponents/StandardSVG";

const username = localStorage.getItem('user');

function MobileOptions({ 
    isNavDropdown, 
    setIsNavDropdown, 
    fetchProfiles,
    isHideHeader, 
}) {
    const navigate = new useNavigate();

    //rotate burger icon when active
    const rotate = isNavDropdown ? 'origin-center rotate-90' : '';

    function handleClick() {
        if(localStorage.getItem('user')) {
            fetchProfiles();
        };
        navigate('/');
    };

    return(
        <>
            {/* Home icon */}
            <Button 
                text={`Skill Swap`}
                handleOnClick={handleClick}
                styles={`${!username && 'py-2.5'} min-w-fit pr-5 text-4xl text-white`}
            />
            <Button
                handleOnClick={() => setIsNavDropdown(!isNavDropdown)}
                styles={`${rotate} ${username && 'bg-stone-950'} text-white py-2.5 px-5 sm:hidden`}
                text={
                    <StandardSVG 
                        size='size-6'
                        dAttribute='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
                    />
                }
            />
        </>
    );
};

export default MobileOptions;