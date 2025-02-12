import { useState } from 'react';
import Button from "../../../commonComponents/Button";
import MapData from '../../../features/methods/MapData';
import { Facebook, Twitter, LinkedIn } from '../../../commonComponents/SVGs';

function Left({ 
    displayedProfile, 
    img,
    isMatched,
    unMatch,
    isPlatformLinks,
    goToSocialsPlatform,
}) {
    return(
        <div className='flex flex-col h-full items-center sm:justify-between sm:h-full sm:items-start'>
            <img 
                src={img}
                className='min-h-48 w-48 bg-black rounded-full flex justify-center items-center text-white sm:min-h-28 sm:w-28 sm:self-start' 
            />
            <div>
                <p className="text-xl text-stone-900 font-bold">{displayedProfile?.username}</p>
                {isMatched && displayedProfile?.phone_number && 
                    <p className="text-stone-500">
                        {displayedProfile?.phone_number}
                    </p>
                }
            </div>
            <div className='flex flex-col items-center h-full sm:items-start sm:gap-0'>
                {isMatched && displayedProfile?.email && 
                    <p className={`font-medium`}>{displayedProfile?.email}</p>
                }
                {isMatched && displayedProfile?.phone_number && 
                    <p></p>
                }
                {isPlatformLinks && 
                    <div className='flex'>
                        <MapData 
                            data={displayedProfile?.socials}
                            render={(obj) => {
                                const [isHovered, setIsHovered] = useState();

                                let svg;

                                //set appropritate svg icons
                                if(obj?.platform === 'twitter') {
                                    svg = <Twitter isHovered={isHovered} />
                                };

                                if(obj?.platform === 'facebook') {
                                    svg = <Facebook isHovered={isHovered} />
                                };

                                if(obj?.platform === 'linkedin') {
                                    svg = <LinkedIn isHovered={isHovered} />
                                };

                                return(
                                    <Button 
                                        key={obj?.platform}
                                        text={svg}
                                        handleOnClick={() => goToSocialsPlatform(obj?.url)}
                                        handleOnMouseOver={() => setIsHovered(true)}
                                        handleOnMouseLeave={() => setIsHovered(false)}
                                        isHandleHover={true}
                                    />
                                );
                            }}
                        />
                    </div>
                }
                {isMatched && 
                    <Button 
                        handleOnClick={() => unMatch(displayedProfile?.username)}
                        styles={`h-10 w-28 flex justify-center items-center rounded-lg text-white hover:font-semibold bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 cursor-pointer absolute bottom-0 sm:h-8 sm:w-20`}
                        text={'Unmatch'}
                    />
                }
            </div>
        </div>
    );
};

export default Left;