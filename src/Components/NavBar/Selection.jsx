import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../commonComponents/Button';
import MapData from '../../features/methods/MapData';
import Option from './SkillFilters/Option';

const username = localStorage.getItem('user');

function Selection({ 
    setWhichFilter, 
    obj, 
    text, 
    path, 
    isLink, 
    canHover, 
    category, 
    showRight, 
    setFilter,
    setIsNavDropdown,
}) {
    const [isShown, setIsShown] = useState(false);

    const navigate = new useNavigate();

    //fetch all users associated with the selected skill.
    async function handleSkillOnClick(skill) {
        //assign filter values to filter state object
        setFilter({
            category: category,
            skill: skill
        });
        //determine whether filter option was selected from header or main section
        setWhichFilter({ mainFilter: false, headerFilter: true });
        setIsShown(false);
    };

    function handleHover(state) {
        switch (state) {
            case 'in':
                setIsShown(true);
                break;
            case 'out':
                setIsShown(false);
                break;
        };  
    };

    return(
        isLink ?
                //Home page button / icon
                <Button 
                    styles={`h-1/2 hover:bg-white/30 border-b p-2.5 sm:mb-0 sm:px-10 sm:py-0 w-full text-center text-white flex justify-between items-center hover:bg-stone-700 sm:border-none sm:h-auto sm:w-1/2`}
                    text={text}
                    handleOnClick={() => {setIsNavDropdown(false), navigate(path)}}  
                />
            :
                //Category item in navbar options
                <div 
                    className='relative w-full flex items-center justify-center my-0 hover:bg-white/20' 
                    {...(canHover && { 
                            onMouseOver: () => handleHover('in'), 
                            onMouseLeave: () => handleHover('out') 
                        })
                    }
                >
                    <p className='sm:mb-0 w-full sm:px-10 text-xl sm:text-xs text-white'>{text}</p>
                    {/* Skills set for hovered over category in navbar */}
                    {canHover && 
                        <ul 
                            id='dropDown' 
                            className={`${isShown ? 'block' : 'hidden'} absolute top-full ${showRight ? 'sm:right-0' : 'sm:left-0'} w-full w-max h-72 grid grid-cols-2 bg-white shadow-xl border-t overflow-y-auto no-scrollbar`}
                        >
                            <MapData 
                                data={obj?.skills}
                                render={(skill, index) => (
                                    <Option 
                                        key={skill}
                                        skill={skill}
                                        handleClick={handleSkillOnClick}
                                    />
                                )}
                            />
                        </ul>
                    }
                </div>
    )
};

export default Selection;