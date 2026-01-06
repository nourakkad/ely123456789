import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { DrMohammedJubain, CrazyBeeez, MamonAssa } from './components/contact-cards';
import './App.css';

// Main Home Page Component
const HomePage = () => {
  return (
    <>
      <Banner />
      <Services />
      <About />
      <Team />
      <Portfolio />
      <Contact />
    </>
  );
};

// Layout Component to conditionally render Header and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isContactCard = location.pathname.startsWith('/contact/');
  
  return (
    <div className="App">
      {!isContactCard && <Header />}
      {children}
      {!isContactCard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Contact Card Routes */}
          <Route path="/contact/dr-mohammed-jubain" element={<DrMohammedJubain />} />
          <Route path="/contact/crazy-beeez" element={<CrazyBeeez />} />
          <Route path="/contact/mamon-assa" element={<MamonAssa />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
