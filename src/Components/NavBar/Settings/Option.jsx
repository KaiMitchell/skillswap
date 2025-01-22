import { useEffect, useState } from "react";
import PopOut from "./PopOut.jsx";
import Button from "../../../commonComponents/Button.jsx";
import MobileDropdownModal from "../../../commonComponents/MobileDropdownModal.jsx";

function Option({ 
    skills, 
    fetchData,
    data, 
    setUser, 
    text, 
    setIsSettings, 
    setIsShown,
    displayProfile,
    isNavDropDown,
    setIsNavDropdown,
}) { 
    const [mobileDropdown, setMobileDropdown] = useState(null);
    let clickHandler = () => {
        setMobileDropdown(text);
        console.log(text);
    }; 

    //hide the pop up option for mobile when selectig an option
    useEffect(() => {
        setMobileDropdown(null);
    }, [isNavDropDown]);

    async function signOut() {
        await fetch(`http://localhost:4000/signout`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            // credentials: 'include'
        });
        localStorage.removeItem('user');
        sessionStorage.removeItem('access token');
        setUser();
    };

    //dynamically apply a handler to certain button
    switch(text) {
        case 'Sign out':
            clickHandler = signOut;
            break;
        case 'Settings':
            clickHandler = () => {
                setIsSettings(true);
                setIsShown(() => false);
            };
            break;
    };

    //only apply the pop out feature on elements that are not for signing out or opening settings
    const isNotSignOutOrSettings = text !== 'Sign out' && text !== 'Settings';

    return(
            <div>
                {mobileDropdown && 
                    <MobileDropdownModal 
                        fetchData={fetchData}
                        data={data}
                        text={text}
                        skills={skills}
                        displayProfile={displayProfile}
                        setMobileDropdown={setMobileDropdown}
                        mobileDropDown={mobileDropdown}
                    />
                }
                <div className='relative group h-fit'>
                    <Button 
                        handleOnClick={clickHandler} 
                        styles={`flex w-full py-5 px-2.5 sm:px-10 items-center sm:justify-center my-0 text-sm text-stone-500 hover:text-stone-400 hover:bg-stone-700 hover:cursor-pointer`}
                        text={text}
                    />
                    {isNotSignOutOrSettings && 
                        <PopOut 
                            fetchData={fetchData}
                            data={data}
                            text={text}
                            skills={skills}
                            displayProfile={displayProfile}
                            mobileDropDown={mobileDropdown}
                        />
                    }
                </div>
            </div>
    );
};

export default Option;