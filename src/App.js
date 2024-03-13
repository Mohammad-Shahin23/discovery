// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaflet1 from './pages/leaflets/Leaflet1';
import Contact from './pages/Contact';
import FeedbackForm from './pages/FeedbackForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Leaflet1" element={<Leaflet1 />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;
