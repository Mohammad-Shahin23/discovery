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

  useEffect(() => {
    const apiEndpoint = `https://arabbanktest.azurewebsites.net/api/Api/GetDiscoveryContent?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}&lang=${lang}`;

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
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
        console.error('Error fetching API:', error);
      });
  }, [country, branch, bench, type, product, lang]);

  const subProduct = data.result && data.result.leaflet ? data.result.subProduct : [];
  const productTitle = data.result ? data.result.product : '';

  const handleSubProductClick = (selectedSubProduct, index) => {
    if (typeof onSubProductClick === 'function') {
      onSubProductClick(selectedSubProduct, index);
    }
  };

  return (
    <div className="empty-card-container">
      <div id="emptyCard">
        <div className="card-title">{productTitle}</div>
        <ul className="text-list">
          {subProduct.map((subProductItem, index) => (
            <li key={index} onClick={() => handleSubProductClick(subProductItem, index)}>
              <div className="hover-container"></div>
              <KeyboardDoubleArrowRightIcon fontSize="small" />
              {subProductItem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
