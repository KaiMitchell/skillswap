import { useRef, useEffect, useState } from "react";
import Details from "./Details";

function Modal({ 
    displayedProfile,
    setIsDisplayedProfile, 
    isDisplayedProfile,
    unMatch,
    fetchRequests,
    displayedProfileType,
    matches,
    isSent,
 }) {
    const [isHovered, setIsHovered] = useState(false);
    const node = useRef();

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsDisplayedProfile(false);
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return(
        <div 
            ref={node} 
            className={`${isDisplayedProfile ? 'block' : 'hidden'} fixed flex flex-col py-5 px-10 gap-5 size-full m-auto z-20 top-0 bottom-0 left-0 right-0 bg-stone-100 sm:size-4/5 sm:p-10 sm:shadow-xl sm:shadow-black sm:rounded overflow-y-scroll no-scrollbar`}
        >
            <Details 
                displayedProfileType={displayedProfileType}
                fetchRequests={fetchRequests}
                isHovered={isHovered} 
                setIsHovered={setIsHovered}
                setIsDisplayedProfile={setIsDisplayedProfile}
                displayedProfile={displayedProfile}
                unMatch={unMatch}
                matches={matches}
                isSent={isSent}
            />
            {/* <Footer /> */}
        </div>
    );
};

export default Modal;