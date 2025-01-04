import { useRef, useEffect, useState } from "react";
import Details from "./Details";
import Footer from "./Footer";

function Modal({ setIsDisplayMatch, isDisplayMatch }) {
    const [isHovered, setIsHovered] = useState(false);
    const node = useRef();

    function closeModal(e) {
        if(node.current && !node.current.contains(e.target)) {
            setIsDisplayMatch(false);
        };
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return(
        <div ref={node} className={`${isDisplayMatch ? 'block' : 'hidden'} fixed flex flex-col justify-between sm:size-3/5 m-auto z-20 top-0 bottom-0 left-0 right-0 p-2.5 rounded bg-stone-100 shadow-xl shadow-black overflow-y-scroll no-scrollbar`}>
            <Details isHovered={isHovered} setIsHovered={setIsHovered} />
            <Footer />
        </div>
    );
};

export default Modal;