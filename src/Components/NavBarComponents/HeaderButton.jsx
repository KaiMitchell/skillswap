import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';

function HeaderButton({ text, path, setUser, clickAction, isLink, canHover, category, showRight, setFilter }) {
    const [isShown, setIsShown] = useState(false);

    function handleClick() {
        switch(clickAction) {
            case 'log settings':
                console.log('settings button clicked');
                break;
            case 'sign out':
                setUser({ username: '' });
                localStorage.removeItem("user");
                break;
            case 'tips':
                console.log('tips button clicked');
                break;
        };
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
                <Link className='sm:mb-0 px-2.5 text-white flex justify-between items-center hover:bg-stone-700' to={path}>
                    <button className={`text-nowrap text-xs`}>
                        {text}
                    </button>
                </Link>
            :
                <div className='relative w-full flex items-center justify-center my-0 hover:bg-stone-700' {...(canHover && { onMouseOver: () => handleHover('in'), onMouseLeave: () => handleHover('out') })}>
                    <button onClick={() => handleClick()} className='sm:mb-0 w-full px-10 text-xs text-white'>
                        {text}
                    </button>
                    {canHover && <HeaderDropDown isShown={isShown} setIsShown={setIsShown} category={category} showRight={showRight} setFilter={setFilter} />}
                </div>
    )
};

export default HeaderButton;