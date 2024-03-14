import React, { useState, useEffect } from 'react';
import '../styles/ContactCard.css';

const ContactCard = () => {
  const [name, setName] = useState('');
  const [countryNameFromUrl, setCountryNameFromUrl] = useState('');
  const [countryMobileHint, setCountryMobileHint] = useState('');
  const [mobileCode, setMobileCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isNumeric, setIsNumeric] = useState(true); // State to track numeric validation
  const [isLettersOnly, setIsLettersOnly] = useState(true); // State to track letters-only validation
  const [isFormValid, setIsFormValid] = useState(true); // State to track overall form validity

  useEffect(() => {
    // Extract country name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const countryNameFromUrl = urlParams.get('countryName');
    setCountryNameFromUrl(countryNameFromUrl);
    const fetchData = async () => {
      try {
        const response = await fetch('https://arabbanktest.azurewebsites.net/api/Country/FetchCountryCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(countryNameFromUrl),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        // Process the response data if needed
        console.log('Response:', data);
        setCountryMobileHint(data[0].countryMobileHint);
        setMobileCode(data[0].mobileCode);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function immediately
    if (countryNameFromUrl) {
      fetchData();
    }
  }, [countryNameFromUrl]);

  const handlePhoneNumberChange = (value) => {
    // Check if the value contains only numeric characters
    setIsNumeric(/^\d+$/.test(value));
    setPhoneNumber(value.replace(/[^0-9]/g, ''));
  };

  const handleNameChange = (value) => {
    // Check if the value contains only letters
    setIsLettersOnly(/^[A-Za-z\s]+$/.test(value));
    setName(value);
  };

  const handleButtonClick = async (action) => {
    const urlParams = new URLSearchParams(window.location.search);

    if (action === 'Submit') {
      try {
        console.log('countryNameFromUrl:', countryNameFromUrl);

        const contentDetailsResponse = await fetch('https://arabbanktest.azurewebsites.net/api/SendEmailForTicket', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticketId: 0,
            requestType: urlParams.get('requestType') || 'string',
            country: countryNameFromUrl || 'string',
            productName: urlParams.get('productName') || 'string',
            subProductName: urlParams.get('subProduct') || 'string', // Adjusted here
            customerName: name || 'string',
            mobileCountryCode: countryMobileHint || 'string',
            mobile: phoneNumber || 'string',
            discoveryBench: parseInt(urlParams.get('bench')) || 0,
            branchNumber: urlParams.get('branch') || 'string',
            branchName: urlParams.get('branchName') || 'string',
            browsingLanguage: urlParams.get('lang') || 'string',
            submissionDateTime: new Date().toJSON() || 'string',
            ticketStatus: 'open',
          }),
        });

        if (!contentDetailsResponse.ok) {
          throw new Error('Failed to fetch content details data');
        }

        const contentType = contentDetailsResponse.headers.get('content-type');
        if (contentType && contentType.startsWith('application/json')) {
          const contentDetailsData = await contentDetailsResponse.json();
          // Process the content details response data if needed
          console.log('Content Details Response:', contentDetailsData);
        } else {
          // Handle non-JSON response (e.g., success message)
          const responseText = await contentDetailsResponse.text();
          console.log('Non-JSON Response:', responseText);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    } else if (action === 'Close') {
      // Go back to the previous page
      window.history.back();
    }
  };

  // Update form validity whenever inputs change
  useEffect(() => {
    setIsFormValid(isNumeric && isLettersOnly);
  }, [isNumeric, isLettersOnly]);

  return (
    <div className="contact-card">
      <div className='Contct_title'>
        <h3>Contact Information</h3>
      </div>

      <div className="mobile-inputs">
        <label>Name:</label>
        <input
          className={`input3 ${!isLettersOnly ? 'invalid' : ''}`}
          type="text"
          placeholder='Enter Your Name'
          onChange={(e) => handleNameChange(e.target.value)}
          required
        />
        {!isLettersOnly && <div className="validation-message">Only letters are allowed</div>}

        <label>Mobile:</label>
        <div className='Inputs'>
          <input
            className='input1'
            type="text"
            placeholder={mobileCode}
            disabled
          />
          <input
            className={`input2 ${!isNumeric ? 'invalid' : ''}`}
            type="text"
            placeholder={countryMobileHint}
            style={{ marginLeft: '10px' }}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            required
          />
          {!isNumeric && <div className="validation-message">Only numbers are allowed</div>}
        </div>
        <div className="button-row">
          <button id='Submit' variant="success" onClick={() => handleButtonClick('Submit')} disabled={!isFormValid}>
            Submit
          </button>
          <button id='Close' variant="danger" onClick={() => handleButtonClick('Close')}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
