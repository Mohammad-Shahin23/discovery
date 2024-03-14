import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import '../styles/FeedbackForm.css';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

function FeedbackForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const country = queryParams.get('country'); // Retrieve 'country' query parameter
  const branch = queryParams.get('branch'); // Retrieve 'branch' query parameter
  const lang = queryParams.get('lang'); // Retrieve 'lan' query parameter

  const [feedback, setFeedback] = useState({
    feedbackType: 'Suggestion & Feedback',
    branchName: '',
    countryName: '',
    name: '',
    mobilePrefix: '',
    mobileNumber: '',
    mobileNumberValue: '',
    message: '',
    rating: 1,
    
  });

  useEffect(() => {
    async function fetchCountryData() {
      try {
        const response = await fetch(`https://arabbanktest.azurewebsites.net/api/Country/getCountryCode?country=${country}&branch=${branch}&lang=${lang}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setFeedback({
          ...feedback,
          mobilePrefix: data.countryDetails[0]?.mobileCode || null,
          mobileNumber: data.countryDetails[0]?.countryMobileHint || null,
          countryName: data.countryDetails[0]?.countryName || '',
          branchName: data.branchDetails.branchName || '',
          branchNumber: data.branchDetails.branchNumber || '',
        });

      } catch (error) {
        console.error("Fetch error: " + error.message);
      }
    }

    fetchCountryData();
  }, []);
  

  const smileRating = [
    <FrownOutlined />,
    <FrownOutlined />,
    <MehOutlined />,
    <SmileOutlined />,
    <SmileOutlined />,
  ];

  // Handle input changes
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionDateTime = new Date().toISOString();
    const body = {
      id: 0,
      submissionDateTime: submissionDateTime,
      requestType: feedback.feedbackType,
      feedbackType: feedback.feedbackType,
      country: feedback.countryName,
      branchNumber: feedback.branchNumber,
      branchName: feedback.branchName,
      browsingLanguage: lang,
      customerName: feedback.name,
      mobileCountryCode: feedback.mobilePrefix,
      mobile: feedback.mobileNumberValue,
      feedbackContent: feedback.message,
    };

    try {
      const response = await fetch('https://arabbanktest.azurewebsites.net/api/SendEmailForFeedBack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log(body);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Feedback submitted successfully!');
      // Optionally, reset the form after successful submission
      setFeedback({
        ...feedback,
        name: '',
        message: '',
        mobileNumberValue: '',
        rating: 1,
      });

    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };
    return (
        <div className="feedback-container">
            <form onSubmit={handleSubmit}>
                <div className="feedback-header">
                    <h2>Feedback</h2>
                </div>
                <div className="feedback-type">
                    <label>Feedback Type</label>
                    <div className="feedback-type-radio">
                        <input type="radio" id="compliment" name="feedbackType" value="compliment" checked={feedback.feedbackType === 'compliment'} onChange={handleChange} />
                        <label htmlFor="compliment">compliment</label>
                        <input type="radio" id="suggestion" name="feedbackType" value="FeedBack"  onChange={handleChange} />
                        <label htmlFor="suggestion">Suggestion & Feedback</label>
                        <input type="radio" id="experienceRating" name="feedbackType" value="Rating" onChange={handleChange} />
                        <label htmlFor="experienceRating">Experience Rating</label>
                    </div>
                </div>
                <div className="feedback-form">
                    <div className="form-group name">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Name" value={feedback.name} onChange={handleChange} />
                    </div>
                    <div className="form-group mobile-group">
                        <label htmlFor="mobilePrefix">Mobile Number</label>
                        <div className="prefix">
                        <input
                            type="tel"
                            id="mobilePrefix"
                            name="mobilePrefix"
                            value={feedback.mobilePrefix}
                            readOnly
                        />

                        </div>
                        <div className="mobile-number">
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumberValue"
                                placeholder={feedback.mobileNumber}
                                value={feedback.mobileNumberValue}
                                
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group textArea">
                        <label htmlFor="message">Feedback</label>
                        <textarea id="message" name="message" placeholder="Feedback" value={feedback.message} onChange={handleChange} />
                    </div>
                </div>
                <div className="feedback-rating">
                    <label>Experience Rating</label>
                    <Rate 
                    defaultValue={0}
                    count={5}
                    style={{ fontSize: 50 }}
                    character={({ index }) => smileRating[index]}
                    value={feedback.rating} onChange={(value) => setFeedback({ ...feedback, rating: value })} />
                    {/* Define other rating inputs similar to the above */}
                </div>
                <div className="feedback-submit">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setFeedback({
                      ...feedback,
                      feedbackType: 'compliment',
                      name: '',
                      mobileNumberValue: '',
                      message: '',
                      rating: 1,
                    })}>Clear</button>

                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
