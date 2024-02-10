import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/leaflet/LeafletCard.css';

function LeafletCard({ country, branch, branchName, branchCode,  bench, type, product, productName, lang }) {
  console.log('productName', productName);
  const navigate = useNavigate();
  const [subProductData, setSubProductData] = useState(null);
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    const fetchSubProductData = async () => {
      try {
        const apiEndpoint = `https://arabbank.azurewebsites.net/api/Api/GetDiscoveryContentDetails?country=${country}&subproduct=Fixed%20Deposit%20Foreign%20Currencies&lang=${lang}`;
        const response = await fetch(apiEndpoint);

        if (!response.ok) {
          throw new Error('Failed to fetch subproduct data');
        }

        const data = await response.json();
        setSubProductData(data.result.subProduct[0]);
        setCountryName(data.result.country);
        countryName = data.result.country;
      } catch (error) {
        console.error('Error fetching subproduct data:', error);
      }
    };

    fetchSubProductData();
  }, [country, lang]);

  const navigateToContact = (buttonValue) => {
    
    const urlParams = `country=${country}&countryName=${countryName}&branch=${branch}&branchName=${branchName}&branchCode=${branchCode}&bench=${bench}&type=${type}&product=${product}&productName=${productName}&lang=${lang}&requestType=${buttonValue}`;
    navigate(`/Contact?${urlParams}`);
  };
  return (
    <div id="leafletCard">
      <div className="card-title"></div>
      {subProductData && (
        <img src={subProductData.image} alt="Card Image" />
      )}
      <ul className="text-list">
        <li>
          <div className="hover-container"></div>
          <input
            type="submit"
            name="btnhousingDepositcalculator"
            value="Maybe later"
            className="myButton"
            onClick={() => navigateToContact("Maybe later")}
          />
        </li>
        <li>
          <div className="hover-container"></div>
          <input
            type="submit"
            name="btnhousingDepositcalculator"
            value="I am interested"
            className="myButton"
            onClick={() => navigateToContact("I am interested")}
          />
        </li>
        <li>
          <div className="hover-container"></div>
          <input
            type="submit"
            name="btnhousingDepositcalculator"
            value="I need help"
            className="myButton"
            onClick={() => navigateToContact("I need help")}
          />
        </li>
        <li>
          <div className="hover-container"></div>
          <input
            type="submit"
            name="btnhousingDepositcalculator"
            value="Loan Calculator"
            className="myButton"
            // onClick={() =>
            //   navigateToPage('country=1&branch=4&bench=1&type=1&product=3')
            // }
          />
        </li>
        {/* Add more list items as needed */}
      </ul>
    </div>
  );
}

export default LeafletCard;
