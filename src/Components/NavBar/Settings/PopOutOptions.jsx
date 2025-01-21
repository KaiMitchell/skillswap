import { useState } from "react";
import MapData from "../../../features/methods/MapData";
import PopOutOption from "./PopOutOption";

function PopOutOptions({ 
    array, 
    removeMatchRequests, 
    acceptMatchRequest, 
    displayProfile,
    type,
    isHandleRequestFeedback,
    isDisabled,
}) {

    // useEffect(() => {}, displayProfile);
    
    return(
        <ul className="text-nowrap">
            <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
            {Array.isArray(array) && array?.length ? 
                <MapData 
                    data={array}
                    render={(item, index) => {
                        return(
                            <PopOutOption 
                                key={item}
                                item={item}
                                displayProfile={displayProfile}
                                removeMatchRequests={removeMatchRequests}
                                acceptMatchRequest={acceptMatchRequest}
                                type={type}
                                isHandleRequestFeedback={isHandleRequestFeedback}
                                isDisabled={isDisabled}
                            />
                        )
                    }}
                />
            : 
                <p className='p-2.5 text-sm text-stone-500'>No pending requests</p>
            }
        </ul>
    );
};

export default PopOutOptions