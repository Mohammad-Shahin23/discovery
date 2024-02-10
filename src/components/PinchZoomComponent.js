
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import '../styles/leaflet/PinchZoomComponent.css';

function PinchZoomComponent({ country, branch, bench, type, product, subProduct ,lang }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBrochure = () => {
    setIsOpen(!isOpen);
  };
    

  const goBack = () => {
    window.history.back();
  };
    

   

  return (

  <div className="page pinch-zoom-parent">
     <div className={`leafletCard-Container ${isOpen ? 'open' : ''}`} onClick={toggleBrochure}>
      <div className="leaflet-titel">
      <p>{`${subProduct}`}</p>
      <button  onClick={goBack} id="back-button"></button>
      </div>
      
      <div className={`Tricontainer ${isOpen ? 'open' : ''}`} id="one">
          
          <div className="left-side">
            <div className="front">
              <div className="content">
                <img src="https://abwebdev.azurewebsites.net/portal/Uploads/Images/2019/07/132066360265582744.jpg" alt="Front" />
              </div>
            </div>
            <div className="back">
              <div className="content"></div>
            </div>
          </div>
          <div className="center">
            <div className="center-content content">
              <img src="https://abwebdev.azurewebsites.net/portal/Uploads/Images/2019/07/132066360393532350.jpg" alt="Center" />
            </div>
          </div>
          <div className="right-side">
            <div className="front">
              <div className="content">
                <img src="https://abwebdev.azurewebsites.net/portal/Uploads/Images/2019/07/132066360452892197.jpg" alt="Right" />
              </div>
            </div>
            <div className="back">
              <div className="content">
                <img src="https://abwebdev.azurewebsites.net/portal/Uploads/Images/2019/07/132066360265582744.jpg" alt="Back" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

);
  }


export default PinchZoomComponent;
