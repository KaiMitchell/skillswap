import { Link } from 'react-router-dom';

function HeaderButton({ text, path, setUser, username, isLink }) {
    function handleClick() {
        if(username !== '') {
            setUser({ username: '' });
            localStorage.removeItem("user");
            console.log(username);
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