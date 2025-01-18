import { useEffect, useState } from "react";
import Button from "../../../commonComponents/Button";

function PopOutOption({
    displayProfile,
    removeMatchRequests,
    acceptMatchRequest,
    type,
    item,
    isHandleRequestFeedback,
    setIsHandleRequestFeedback,
}) {
    const [feedBackCount, setFeedbackCount] = useState('');

    useEffect(() => {
        if(isHandleRequestFeedback === item) {
            setInterval(() => setFeedbackCount(prev => prev += '.'), 250);
        };
    }, [isHandleRequestFeedback]);

    return(
        <li 
            key={item}
            className={`flex items-center justify-between p-2.5 border-b border-stone-900 text-sm text-stone-500 hover:text-stone-400 hadow-xl shadow-black`}
        >
            {/* text renderring for sent & recieved requests */}
            {/* {removeMatchRequests && <p>{!acceptMatchRequest && 'pending'}</p>} */}
            {displayProfile && 
                <Button 
                    handleOnClick={() => displayProfile(item, type)}
                    text={`${isHandleRequestFeedback ? `${item} ${feedBackCount}` : item}`}
                />
            }
            <div className="flex items-center gap-2">
                {removeMatchRequests &&
                    <Button 
                        handleOnClick={() => removeMatchRequests(item)} 
                        styles={`text-xl text-red-400 hover:font-bold cursor-pointer`}
                        text='❌'
                    />
                }
                {acceptMatchRequest && 
                    <Button
                        handleOnClick={() => acceptMatchRequest(item)}
                        styles={`text-xl text-red-400 hover:font-bold cursor-pointer`}
                        text='✅'
                    />
                }
            </div>
        </li>
    );
};

export default PopOutOption;