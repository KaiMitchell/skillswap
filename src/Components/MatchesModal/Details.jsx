import { useState } from "react";
import BottomLeft from "./Left/BottomLeft";
import Left from "./Left/Left";
import Right from "./Right/Right";

function Details({
    displayedMatch,
    isHovered,
    setIsHovered,
    unMatch
}) {
    const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
    const imgURL = 'http://localhost:3000/';

    const imgPath = imgURL + displayedMatch?.profile_picture;

    return(
        <div className='flex gap-5 h-full'>
            <div className='w-full min-h-1/4 h-full flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                {/* image */}
                <div className='w-full h-full'>
                    <div className="w-full h-full flex justify-between">
                        <div className="text-left">
                            <Left 
                                displayedMatch={displayedMatch}
                                img={displayedMatch?.profile_picture ? imgPath : defaultProfileImg}
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