import MapData from "../../../features/methods/MapData";
import PopOutOption from "./PopOutOption";

function PopOutOptions({ 
    array, 
    removeMatchRequests, 
    acceptMatchRequest, 
    displayProfile,
    type
}) {
    
    return(
        <ul className="text-nowrap">
            <h3 className={`p-2.5 text-stone-500`}>{type}</h3>
            {Array.isArray(array) && array?.length ? 
                <MapData 
                    data={array}
                    render={(item, index) => (
                        <PopOutOption 
                            key={item}
                            item={item}
                            displayProfile={displayProfile}
                            removeMatchRequests={removeMatchRequests}
                            acceptMatchRequest={acceptMatchRequest}
                            type={type}
                        />
                    )}
                />
            : 
                <p className='p-2.5 text-sm text-stone-500'>No pending requests</p>
            }
        </ul>
    );
};

export default PopOutOptions