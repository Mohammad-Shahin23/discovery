import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import '../styles/Home.css';

function Home() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const country = params.get('country') || 'defaultCountry';
  const branch = params.get('branch') || 'defaultBranch';
  const bench = params.get('bench') || 'defaultBench';
  const type = params.get('type') || 'defaultType';
  const product = params.get('product') || 'defaultProduct';
  const lang = params.get('lang') || 'en';
  const initialSubProduct = params.get('subProduct') || '';

  const [selectedSubProduct, setSelectedSubProduct] = useState(initialSubProduct);

  const handleSubProductClick = (subProduct) => {
    setSelectedSubProduct(subProduct);
  };

  return (
    <div className="app-container">
      <Card
        country={country}
        branch={branch}
        bench={bench}
        type={type}
        product={product}
        lang={lang}
        onSubProductClick={handleSubProductClick}
      />
      <Carousel
        selectedSubProduct={selectedSubProduct}
        country={country}
        branch={branch}
        bench={bench}
        type={type}
        product={product}
        lang={lang}
      />
    </div>
  );
}

export default Home;
