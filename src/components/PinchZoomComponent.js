
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import '../styles/leaflet/PinchZoomComponent.css';

function PinchZoomComponent({ country, countryName, branch, bench, type, product,productName, subProduct, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [leafletData, setLeafletData] = useState({
    leafletPage1: 'data:image/png;base64,null',
    leafletPage2: 'data:image/png;base64,null',
    leafletPage3: 'data:image/png;base64,null',
    leafletPage4: 'data:image/png;base64,null',
  });
  console.log(country);

  const toggleBrochure = () => {
    setIsOpen(!isOpen);
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://arabbanktest.azurewebsites.net/api/leaflet/getLeafletbysubproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "country": countryName,
            "product": productName,
            "subProduct": subProduct
          }),
        });

        const result = await response.json();

        // Update leafletData state with fetched data
        setLeafletData({
          leafletPage1: result[0].leafletPage1,
          leafletPage2: result[0].leafletPage2,
          leafletPage3: result[0].leafletPage3,
          leafletPage4: result[0].leafletPage4,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [country, product, subProduct]);
  // console.log(leafletData);

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
                <img src={leafletData.leafletPage2} alt="Front" />
              </div>
            </div>
            <div className="back">
              <div className="content"></div>
            </div>
          </div>
          <div className="center">
            <div className="center-content content">
              <img src={leafletData.leafletPage3} alt="Center" />
            </div>
          </div>
          <div className="right-side">
            <div className="front">
              <div className="content">
                <img src={leafletData.leafletPage4}alt="Right" />
              </div>
            </div>
            <div className="mainPage">
              <div className="content">
                <img src={leafletData.leafletPage1} alt="Back" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  

    );
}
export default PinchZoomComponent;