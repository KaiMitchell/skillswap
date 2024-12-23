import { Link } from 'react-router-dom';

function HeaderButton({ text, path, setUser, user, isLink }) {
    function handleClick() {
        if(user) {
            setUser(false);
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
                <button onClick={() => handleClick()} className='sm:mb-0 text-white flex items-center'>
                    {text}
                </button>
    )
};

export default HeaderButton;