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
    const [isHovered, setIsHovered] = useState(false);

    const revertSettingsSvg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={isHovered ? 3 : 1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                              </svg>
  

    return(
        <ul className="text-nowrap">
            <div className={`${isMobile && 'flex'} justify-between`}>
                <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
                {isMobile &&
                    <Button 
                        handleOnClick={() => setMobileDropdown(null)}
                        handleOnMouseOver={() => setIsHovered(true)}
                        handleOnMouseLeave={() => setIsHovered(false)}
                        text={revertSettingsSvg}
                        styles={`p-2.5 text-stone-500`}
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