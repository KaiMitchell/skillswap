import { useState } from "react";
import MapData from "../../../features/methods/MapData";
import PopOutOption from "./PopOutOption";
import Button from "../../../commonComponents/Button";

function PopOutOptions({ 
    array, 
    removeMatchRequests, 
    acceptMatchRequest, 
    displayProfile,
    type,
    isHandleRequestFeedback,
    isDisabled,
    removeAllMatchRequests, 
}) {
    return(
        <ul className="text-nowrap">
            <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
            {type === 'Pending requests' && array.length > 0 &&
                <Button
                    text={`delete all`}
                    handleOnClick={removeAllMatchRequests}
                    styles={`text-sm text-red-500`}
                />
            }
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