import { useState } from "react";
import BottomLeft from "./Left/BottomLeft";
import { Revert } from "../../commonComponents/SVGs";
import Left from "./Left/Left";
import Right from "./Right/Right";
import MapData from "../../features/methods/MapData";
import Button from "../../commonComponents/Button";
import { Facebook, LinkedIn, Twitter } from "../../commonComponents/SVGs";

function Details({
    displayedProfile,
    isHovered,
    unMatch,
    fetchRequests,
    setIsDisplayedProfile,
    displayedProfileType,
    matches,
    isSent,
}) {
    const [isRevertHovered, setIsRevertHovered] = useState(false);

    //determine whether profile shows private details or not based on matched status
    const isMatched = matches.includes(displayedProfile?.username);
    //display links to platforms if they are set
    const isPlatformLinks = displayedProfile?.socials.length > 0;
    const defaultProfileImg = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
    const imgPath = displayedProfile?.profile_picture;

    //vist a users social page when clicking on their socials icon
    function goToSocialsPlatform(link) {    
        window.location = (`//${link}`);
    };

    return(
        <div className='relative flex gap-5 h-full'>
            <Button 
                text={<Revert isHovered={isRevertHovered} />}
                handleOnClick={() => setIsDisplayedProfile(false)}
                handleOnMouseOver={() => setIsRevertHovered(true)}
                handleOnMouseLeave={() => setIsRevertHovered(false)}
                styles={`fixed top-0 right-0 z-20 p-2.5 backdrop-blur-sm bg-black/30 rounded-bl sm:hidden`}
            />
            <div className='w-full min-h-full flex flex-col lg:flex-row gap-5 justify-between mb-5 text-center lg:text-left'>   
                <div className='flex flex-col justify-center w-full h-full'>
                    <div className="w-full h-full flex flex-col justify-between items-center sm:items-start sm:flex-row">
                        <div className="relative h-full flex flex-col justify-between items-center text-left sm:items-start sm:w-1/2">
                            {/* image */}
                            <Left 
                                displayedProfile={displayedProfile}
                                img={displayedProfile?.profile_picture ? imgPath : defaultProfileImg}
                                isMatched={isMatched}
                                unMatch={unMatch}
                                isPlatformLinks={isPlatformLinks}
                                goToSocialsPlatform={goToSocialsPlatform}
                            />
                            {/* {isPlatformLinks && 
                                <div className='absolute top-0 right-full flex flex-col sm:top-auto sm:right-auto sm:flex-row sm:mt-2.5'>
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
                            } */}
                        </div>
                        <Right 
                            displayedProfileType={displayedProfileType}
                            setIsDisplayedProfile={setIsDisplayedProfile}
                            displayedProfile={displayedProfile}
                            isHovered={isHovered} 
                            isMatched={isMatched}
                            fetchRequests={fetchRequests}
                            isSent={isSent}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;