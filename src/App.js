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
import { DrMohammedJubain, CrazyBeeez, MamonAssa, DrNaderAlmzayek, HussamAlhamad, RashidAdas, AbdalrahmanAdas, YassenAltabakh, AnwarSaeedJassem, ShadiSaeedJassem, DeauCacao, MuhammedAladdinHaymour } from './components/contact-cards';
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
          <Route path="/contact/dr-nader-almzayek" element={<DrNaderAlmzayek />} />
          <Route path="/contact/hussam-alhamad" element={<HussamAlhamad />} />
          <Route path="/contact/rashid-adas" element={<RashidAdas />} />
          <Route path="/contact/abdalrahman-adas" element={<AbdalrahmanAdas />} />
          <Route path="/contact/yassen-altabakh" element={<YassenAltabakh />} />
          <Route path="/contact/anwar-saeed-jassem" element={<AnwarSaeedJassem />} />
          <Route path="/contact/shadi-saeed-jassem" element={<ShadiSaeedJassem />} />
          <Route path="/contact/deau-cacao" element={<DeauCacao />} />
          <Route path="/contact/muhammed-aladdin-haymour" element={<MuhammedAladdinHaymour />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
