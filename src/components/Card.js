import React, { useEffect, useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import '../styles/Card.css';

const Card = ({ country, branch, bench, type, product, lang, onSubProductClick }) => {

  
  const [data, setData] = useState({
    result: {
      product: '',
      subProduct: { leaflet: { subProduct: [] } },
    },
  });
  const handleSubProductClick = (selectedSubProduct, index) => {
    console.log('Subproduct clicked:', selectedSubProduct, 'Index:', index);

    if (typeof onSubProductClick === 'function') {
      onSubProductClick(selectedSubProduct);
    }

    // Move the carousel to the corresponding image
    const swiperContainer = document.querySelector('.swiper-container');

    // Check if Swiper instance is available
    if (swiperContainer && swiperContainer.swiper) {
      console.log('Swiper instance found');
      swiperContainer.swiper.slideTo(index);
    } else {
      console.log('Swiper instance not found');
    }
  };

  useEffect(() => {
    const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetDiscoveryContent?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}&lang=${lang}`;

    console.log('API Endpoint:', apiEndpoint);

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        setData(data);

        // Adjust alignment and direction based on language
        const cardElement = document.querySelector('#emptyCard');
        const textListElement = document.querySelector('.text-list');

        if (lang === 'ar') {
          cardElement.style.textAlign = 'right';
          textListElement.style.direction = 'rtl';
        } else {
          cardElement.style.textAlign = 'left';
          textListElement.style.direction = 'ltr';
        }
      })
      .catch(error => {
        // Display error message
        console.error('Error fetching API:', error);
      });
  }, [country, branch, bench, type, product, lang]);

const subProduct = data.result && data.result.leaflet ? data.result.leaflet : [];

const productTitle = data.result ? data.result.product : '';



return (
  <div className="empty-card-container">
    <div id="emptyCard">
      <div className="card-title">{productTitle}</div>
      <ul className="text-list">
        {subProduct.map((subProductItem, index) => (
          <li key={index} onClick={() => handleSubProductClick(subProductItem.subProduct, index)}>
            <div className="hover-container"></div>
            <KeyboardDoubleArrowRightIcon fontSize="small" />
            {subProductItem.subProduct}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
};

export default Card;






