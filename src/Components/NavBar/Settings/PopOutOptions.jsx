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
    isMobile,
    setMobileDropdown,
}) {
    return(
        <ul className="text-nowrap">
            <div className={`${isMobile && 'flex'} justify-between`}>
                <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
                {isMobile &&
                    <Button 
                        handleOnClick={() => setMobileDropdown(null)}
                        text={'X'}
                        styles={`text-black`}
                    />
                }
            </div>
            {type === 'Pending requests' && array.length > 0 &&
                <Button
                    text={`delete all`}
                    handleOnClick={removeAllMatchRequests}
                    styles={`px-2.5 text-sm text-red-500`}
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