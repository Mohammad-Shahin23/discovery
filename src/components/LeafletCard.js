import React from 'react'
import '../styles/leaflet/LeafletCard.css'

function LeafletCard() {
    const navigateToPage = (url) => {
        window.location.href = url;
      };
    
      return (
        <div className="leafletCard" id="emptyCard">
          <div className="card-title"></div>
          <img
            src="https://abwebdev.azurewebsites.net/portal/Uploads/Images/2019/09/132131729721708202.jpg"
            alt="Card Image"
          />
          <ul className="text-list">
            <li>
              <div className="hover-container"></div>
              <input
                type="submit"
                name="btnhousingDepositcalculator"
                value="Maybe later"
                className="myButton"
              />
            </li>
            <li>
              <div className="hover-container"></div>
              <input
                type="submit"
                name="btnhousingDepositcalculator"
                value="I am interested"
                className="myButton"
              />
            </li>
            <li>
              <div className="hover-container"></div>
              <input
                type="submit"
                name="btnhousingDepositcalculator"
                value="I need help"
                className="myButton"
                onClick={() =>
                  navigateToPage(
                    'index.html?country=1&branch=4&bench=1&type=1&product=3'
                  )
                }
              />
            </li>
            <li>
              <div className="hover-container"></div>
              <input
                type="submit"
                name="btnhousingDepositcalculator"
                value="Loan Calculator"
                className="myButton"
                onClick={() =>
                  navigateToPage(
                    'index.html?country=1&branch=4&bench=1&type=1&product=3'
                  )
                }
              />
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      );
}

export default LeafletCard
