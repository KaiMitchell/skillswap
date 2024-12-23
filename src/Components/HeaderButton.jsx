import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';

function HeaderButton({ text, path, setUser, clickAction, isLink, canHover, category, showRight }) {
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
                <Link className='sm:mb-0 text-white flex items-center' to={path}>
                    <button className={``}>
                        {text}
                    </button>
                </Link>
            :
                <div className='relative w-full flex items-center justify-center my-0' {...(canHover && { onMouseOver: () => handleHover('in'), onMouseLeave: () => handleHover('out') })}>
                    <button onClick={() => handleClick()} className='sm:mb-0 w-full px-10 text-xs text-white'>
                        {text}
                    </button>
                    {canHover && <HeaderDropDown isShown={isShown} category={category} showRight={showRight} />}
                </div>
    )
};

export default HeaderButton;