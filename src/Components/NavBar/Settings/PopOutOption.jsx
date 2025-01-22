import { useEffect, useState } from "react";
import Button from "../../../commonComponents/Button";

function PopOutOption({
    displayProfile,
    removeMatchRequests,
    acceptMatchRequest,
    type,
    item,
    isHandleRequestFeedback,
    isDisabled,
}) {
    const [feedBackCount, setFeedbackCount] = useState('');

    //ellips the dots in a sequence for now
    useEffect(() => {
        if(isHandleRequestFeedback === item) {
            setInterval(() => setFeedbackCount(prev => prev += '.'), 250);
        };
    }, [isHandleRequestFeedback]);

    return(
        <li 
            key={item}
            className={`flex items-center justify-between p-2.5 border-b border-stone-900 text-sm text-stone-500 sm:hover:text-stone-400 shadow-xl shadow-black`}
        >
            {/* text renderring for sent & recieved requests */}
            {/* {removeMatchRequests && <p>{!acceptMatchRequest && 'pending'}</p>} */}
            {displayProfile && 
                <Button 
                    handleOnClick={() => displayProfile(item, type)}
                    text={`${isHandleRequestFeedback ? `${item} ${feedBackCount}` : item}`}
                    styles={`hover:text-stone-400`}
                />
            }
            <div className="flex items-center gap-2">
                {removeMatchRequests &&
                    <Button 
                        handleOnClick={() => removeMatchRequests(item)} 
                        styles={`text-xl text-red-400 hover:font-bold cursor-pointer`}
                        text='❌'
                        isDisabled={isDisabled}
                    />
                }
                {acceptMatchRequest && 
                    <Button
                        handleOnClick={() => acceptMatchRequest(item)}
                        styles={`text-xl text-red-400 hover:font-bold cursor-pointer`}
                        text='✅'
                        isDisabled={isDisabled}
                    />
                }
            </div>
        </li>
    );
};

export default PopOutOption;