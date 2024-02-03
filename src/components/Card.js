import React, { useEffect, useState } from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import '../styles/Card.css';



const Card = ({ country, branch, bench, type, product, lang }) => {
  const [data, setData] = useState({ result: { product: '', subProduct: [] } });

  useEffect(() => {
    const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetDiscoveryContent?country=${country}&branch=${branch}&bench=${bench}&type=${type}&product=${product}&lang=${lang}`;

    console.log('API Endpoint:', apiEndpoint);

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        setData(data);

        // Adjust alignment and direction based on language
        const cardElement = document.querySelector('.card');
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

  const productTitle = data.result ? data.result.product : '';
  const subProducts = data.result ? data.result.subProduct : [];

  return (
    <div className="empty-card-container">
      <div className="card" id="emptyCard">
        <div className="card-title">{productTitle}</div>
        <ul className="text-list">
          {subProducts.map((subProduct, index) => (
            <li key={index}>
              <div className="hover-container"></div>
              <KeyboardDoubleArrowRightIcon  fontSize="small"/>  
              {subProduct}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
