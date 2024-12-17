import { Link } from 'react-router-dom';

function HeaderButton({ text, path, isLink }) {
    return(
    isLink ?
                <Link className='sm:mb-0 text-white flex items-center' to={path}>
                    <button className={``}>
                        {text}
                    </button>
                </Link>
            :
                <button className='sm:mb-0 text-white flex items-center'>
                    {text}
                </button>
    )
};

export default HeaderButton;