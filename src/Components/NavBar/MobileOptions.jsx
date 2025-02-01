import { useNavigate } from "react-router-dom";
import Button from "../../commonComponents/Button";
import StandardSVG from "../../commonComponents/StandardSVG";

function MobileOptions({ 
    isNavDropdown, 
    setIsNavDropdown, 
    fetchProfiles, 
    setCurrentPage,
}) {
    const navigate = new useNavigate();

    //rotate burger icon when active
    const rotate = isNavDropdown ? 'origin-center rotate-90' : '';

    function handleClick() {
        if(localStorage.getItem('user')) {
            fetchProfiles();
        };
        setCurrentPage('');
        navigate('/');
    };

    return(
        <>
            {/* Home icon */}
            <Button 
                text={`Skill Swap`}
                handleOnClick={handleClick}
                styles={`min-w-fit py-2.5 px-2.5 text-4xl text-white`}
            />
            <Button
                handleOnClick={() => setIsNavDropdown(!isNavDropdown)}
                styles={`${rotate} text-white py-2.5 px-5 backdrop-blur-lg sm:hidden`}
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