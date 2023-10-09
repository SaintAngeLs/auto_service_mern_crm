import React, { useEffect, useRef, useState } from "react";
import "./WhyUs.css";
import CheckIcon from "@material-ui/icons/Check";
import banner_2 from "../../assets/images/banner_2.jpg";
import banner_3 from "../../assets/images/banner_3.png";
import banner_4 from "../../assets/images/banner_4.png";
import banner_5 from "../../assets/images/banner_5.png";


import videoSource from '../../assets/images/video.mp4';


function WhyUs() {

  const [fadedIn, setFadedIn] = useState(false);
  const [isOpen, setisOpen] = useState(false);
   
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);

    useEffect(() => {

        setTimeout(() => {
            setFadedIn(true);
        }, 100); 
    }, []);


    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
    }, []);


  return (
    <div className="component">
      <div className = "video_component">
      <video ref={videoRef} loop autoPlay muted className={`${fadedIn ? 'faded-in' : ''} w-full object-cover`}>
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <div className="overlay"></div>
    </div>

      
    </div>
  );
}

export default WhyUs;
