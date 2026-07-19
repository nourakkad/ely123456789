import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SectionPage from './pages/SectionPage';
import { DrMohammedJubain, CrazyBeeez, MamonAssa, DrNaderAlmzayek, HussamAlhamad, RashidAdas, AbdalrahmanAdas, YassenAltabakh, AnwarSaeedJassem, ShadiSaeedJassem, DeauCacao, ChocoSwamp, Elyptek, GroupImdad, Maydan, DrHadiAlhariri, DrHadiAlomari, KhalilAlokdi, ArkanCeramics, JasminePerfumes, Mazmazeh, Arta, WatadAgro } from './components/contact-cards';
import { ChocoSwampMenu, KousaMe7shiMenu, ChimneyMenu } from './components/menu/index';
import PageSeo from './seo/PageSeo';
import './App.css';
import './styles/elyptek-brand.css';
import './styles/site-global.css';

import Services from './components/Services';
import About from './components/About';
import Team from './components/Team';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JobApplication from './components/JobApplication';
import ScrollToTop from './components/ScrollToTop';

const Layout = ({ children }) => {
  const location = useLocation();
  const isContactCard = location.pathname.startsWith('/contact/');
  const isRestaurantMenu = location.pathname.startsWith('/menu/');
  const showChrome = !isContactCard && !isRestaurantMenu;
  const shellClass = showChrome ? 'App site-shell' : 'App';

  return (
    <div className={shellClass}>
      <PageSeo />
      <ScrollToTop />
      {showChrome && <Header />}
      {children}
      {showChrome && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<SectionPage><Services /></SectionPage>} />
          <Route path="/about" element={<SectionPage><About /></SectionPage>} />
          <Route path="/team" element={<SectionPage><Team /></SectionPage>} />
          <Route path="/portfolio" element={<SectionPage><Portfolio /></SectionPage>} />
          <Route path="/contact" element={<SectionPage><Contact /></SectionPage>} />

          <Route path="/form" element={<SectionPage><JobApplication /></SectionPage>} />

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
          <Route path="/contact/chocoswamp" element={<ChocoSwamp />} />
          <Route path="/contact/elyptek" element={<Elyptek />} />
          <Route path="/contact/group-imdad" element={<GroupImdad />} />
          <Route path="/contact/group-imdadex" element={<Navigate to="/contact/group-imdad" replace />} />
          <Route path="/contact/maydan" element={<Maydan />} />
          <Route path="/contact/muhammed-aladdin-haymour" element={<Navigate to="/contact/maydan" replace />} />
          <Route path="/contact/dr-hadi-alhariri" element={<DrHadiAlhariri />} />
          <Route path="/contact/dr-hadi-alomari" element={<DrHadiAlomari />} />
          <Route path="/contact/khalil-alokdi" element={<KhalilAlokdi />} />
          <Route path="/contact/arkan-ceramics" element={<ArkanCeramics />} />
          <Route path="/contact/jasmine-perfumes" element={<JasminePerfumes />} />
          <Route path="/contact/mazmazeh" element={<Mazmazeh />} />
          <Route path="/contact/arta" element={<Arta />} />
          <Route path={'/contact/\u00e0rta'} element={<Arta />} />
          <Route path="/contact/watad-agro" element={<WatadAgro />} />

          {/* Restaurant Menu Routes */}
          <Route path="/menu/chocoswamp" element={<ChocoSwampMenu />} />
          <Route path="/menu/kousa-me7shi" element={<KousaMe7shiMenu />} />
          <Route path="/menu/chimney" element={<ChimneyMenu />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
