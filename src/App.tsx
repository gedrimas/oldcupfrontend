import React from 'react';
import './styles/App.css';

import LangLoginBar from './components/langLoginBar/LangLoginBar';
import InfoContacts from './components/infoContacts/InfoContacts';
import SectionMenu from './components/sectionMenu/SectionMenu';
import AdvertBlock from './components/advert/AdvertBlock';

function App() {
  return (
    <div className="App-wrapper">
      <LangLoginBar />
      <InfoContacts />
      <SectionMenu />
      <AdvertBlock />
    </div>
  );
}

export default App;
