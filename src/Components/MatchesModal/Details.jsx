import BottomLeft from "./Left/BottomLeft";
import Left from "./Left/Left";
import Right from "./Right/Right";

function Details({
    isHovered,
    setIsHovered
}) {
    return(
        <div className='flex gap-5'>
            <div className='w-full min-h-1/4 flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                {/* image */}
                <div className='w-full'>
                    <div className="w-full flex justify-between">
                        <Left />
                        <Right isHovered={isHovered} setIsHovered={setIsHovered} />
                    </div>
                    <BottomLeft />
                </div>
            </div>
        </div>
    );
};

export default Details;