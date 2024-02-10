import React from 'react'
import { useLocation } from 'react-router-dom';
import ContactCard from '../components/ContactCard'
import '../styles/Contact.css'

function Contact() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve parameters from the URL
  
  const country = queryParams.get('country');
  const branch = queryParams.get('branch');
  const branchName = queryParams.get('branchName');
  const branchCode = queryParams.get('branchCode'); 
  const bench = queryParams.get('bench');
  const type = queryParams.get('type');
  const product = queryParams.get('product');
  const productName = queryParams.get('productName');
  const subProduct = queryParams.get('subProduct');
  
  const lang = queryParams.get('lang');
  return (
    <div className='bodyContactContainer'>
      <ContactCard 
        country={country}
        branch={branch}
        branchName={branchName}
        branchCode={branchCode}
        bench={bench}
        type={type}
        product={product}
        productName={productName}
        subProduct={subProduct}
        lang={lang}
      />
    </div>
  )
}

export default Contact
