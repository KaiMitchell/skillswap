const MobileOptionsModal = () => {
        function closeModal(e) {
            if(node.current && !node.current.contains(e.target)) {
                setIsSettings(false);
            };
        };
    
        //close settings modal when clicked outside of it
        useEffect(() => {
            document.addEventListener('mousedown', closeModal);
            return () => document.removeEventListener('mousedown', closeModal);
        }, []);
    return(
        <div 
            ref={node} 
            className={`sm:hidden fixed size-10/12 m-auto z-20 top-0 bottom-0 left-0 right-0 px-10 py-5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar`}
        >
        </div>
    );
};

export default MobileOptionsModal;