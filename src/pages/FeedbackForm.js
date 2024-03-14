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

  const [layout, setLayout] = useState({
    direction: lang === 'ar' ? 'rtl' : 'ltr',
    language: lang,
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
  

  useEffect(() => {
    setLayout({
      direction: lang === 'ar' ? 'rtl' : 'ltr',
      language: lang,
    });
  }, [lang]);

  const smileRating = [
    <FrownOutlined />,
    <FrownOutlined />,
    <MehOutlined />,
    <SmileOutlined />,
    <SmileOutlined />,
  ];


  const getTranslation = (key) => {
    const translations = {
      'en': {
        'feedback': 'Feedback',
        'feedbackType' : 'Feedback Type',
        'complaint' : 'Complaint',
        'suggestion&feedback': 'Suggestion & Feedback',
        'experienceRating': 'Experience Rating',
        'name': 'Name',
        'mobileNumber': 'Mobile Number',
        'submit': 'Submit',
        'clear': 'Clear',
        // ... Add more translations for English
      },
      'ar': {
        'feedback': 'ملاحظات',
        'feedbackType' : 'نوع الملاحظات',
        'complaint' : 'شكوى',
        'suggestion&feedback': 'الاقتراح والملاحظات',
        'experienceRating': 'ما هو تقيمك لخدمتنا',
        

        'name': 'الاسم',
        'mobileNumber': 'رقم الهلتف الخلوي',
        'submit': 'إرسال',
        'clear': 'مسح',
        // ... Add more translations for Arabic
      }
    };
    return translations[layout.language][key];
  };



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
        <div className="feedback-container" dir={layout.direction}>
            <form onSubmit={handleSubmit}>
                <div className="feedback-header">
                    <h2>{getTranslation('feedback')}</h2>
                </div>
                <div className="feedback-type">
                    <label>{getTranslation('feedbackType')}</label>
                    <div className="feedback-type-radio">
                        <input type="radio" id="complaint" name="feedbackType" value="complaint" checked={feedback.feedbackType === 'complaint'} onChange={handleChange} />
                        <label htmlFor="complaint">{getTranslation('complaint')}</label>
                        <input type="radio" id="suggestion" name="feedbackType" value="FeedBack"  onChange={handleChange} />
                        <label htmlFor="suggestion">{getTranslation('suggestion&feedback')}</label>
                        <input type="radio" id="experienceRating" name="feedbackType" value="Rating" onChange={handleChange} />
                        <label htmlFor="experienceRating">{getTranslation('experienceRating')}</label>
                    </div>
                </div>
                <div className="feedback-form">
                    <div className="form-group name">
                        <label htmlFor="name">{getTranslation('name')}</label>
                        <input type="text" id="name" name="name" placeholder={getTranslation('name')} value={feedback.name} onChange={handleChange} />
                    </div>
                    <div className="form-group mobile-group">
                        <label htmlFor="mobilePrefix">{getTranslation('mobileNumber')}</label>
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
                        <label htmlFor="message">{getTranslation('feedback')}</label>
                        <textarea id="message" name="message" placeholder={getTranslation('feedback')} value={feedback.message} onChange={handleChange} />
                    </div>
                </div>
                <div className="feedback-rating">
                    <label>{getTranslation('experienceRating')}</label>
                    <Rate 
                    defaultValue={0}
                    count={5}
                    style={{ fontSize: 50 }}
                    character={({ index }) => smileRating[index]}
                    value={feedback.rating} onChange={(value) => setFeedback({ ...feedback, rating: value })} />
                    {/* Define other rating inputs similar to the above */}
                </div>
                <div className="feedback-submit">
                    <button type="submit">{getTranslation('submit')}</button>
                    <button type="button" onClick={() => setFeedback({
                      ...feedback,
                      feedbackType: 'compliment',
                      name: '',
                      mobileNumberValue: '',
                      message: '',
                      rating: 1,
                    })}>{getTranslation('clear')}</button>

                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
