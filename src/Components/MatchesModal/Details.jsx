import BottomLeft from "./Left/BottomLeft";
import Left from "./Left/Left";
import Right from "./Right/Right";

function Details({
    displayedMatch,
    isHovered,
    setIsHovered,
    unMatch
}) {
    return(
        <div className='flex gap-5 h-full'>
            <div className='w-full min-h-1/4 h-full flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                {/* image */}
                <div className='w-full h-full'>
                    <div className="w-full h-full flex justify-between">
                        <div className="text-left">
                            <Left 
                                displayedMatch={displayedMatch}
                            />
                            <BottomLeft displayedMatch={displayedMatch} unMatch={unMatch} />
                        </div>
                        <Right 
                            displayedMatch={displayedMatch}
                            isHovered={isHovered} 
                            setIsHovered={setIsHovered}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;