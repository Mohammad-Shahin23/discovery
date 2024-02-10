import React from 'react';
import { useLocation } from 'react-router-dom';
import LeafletCard from '../../components/LeafletCard';
import PinchZoomComponent from '../../components/PinchZoomComponent';
import '../../styles/leaflet/Leaflet1.css';

function Leaflet1() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Retrieve parameters from the URL
  const imageIndex = queryParams.get('imageIndex');
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
  console.log('productName', productName);



  return (

    
    <div className='pageContainer'>
      <LeafletCard
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
      

      <PinchZoomComponent 
          country={country}
          branch={branch}
          bench={bench}
          type={type}
          product={product}
          subProduct={subProduct}
          lang={lang}
      />
      
      

    </div>
  )
}

export default Leaflet1
