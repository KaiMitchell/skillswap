function Footer() {
    return(
        <footer className='flex justify-between'>
            <div className="flex flex-col items-center border-r border-black w-1/3">
                <h3 className="text-xl font-bold">4.5</h3>
                <p>RATING</p>
            </div>
            <div className='flex flex-col items-center border-r border-black w-1/3'>
                <h3 className="text-xl font-bold">32</h3>
                <p>EXCHANGES</p>
            </div>
            <div className='flex flex-col items-center w-1/3'>
                <h3 className="text-xl font-bold">20</h3>
                <p>EXCHANGES</p>
            </div>
        </footer>
    );
};

export default Footer;