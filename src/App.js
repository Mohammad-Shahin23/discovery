// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaflet1 from './pages/leaflets/Leaflet1';
import Contact from './pages/Contact';
import FeedbackForm from './pages/FeedbackForm';
import MyFeedback from './pages/MyFeedback';
import Manegers from './pages/Manegers';
import Tickets from './pages/Tickets';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Manegers />} />
        <Route path="/MyFeedback" element={<MyFeedback />} />
        
        <Route path="/Tickets" element={<Tickets />} />


        <Route path="/Home" element={<Home />} />
        <Route path="/Leaflet1" element={<Leaflet1 />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/FeedbackForm" element={<FeedbackForm />} />
        


      </Routes>
    </Router>
  );
}

export default App;
