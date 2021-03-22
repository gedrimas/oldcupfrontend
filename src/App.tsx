import React from 'react';
import './styles/App.css';
import { Provider } from 'react-redux';
import store from './reduxAppStore/store';
import LangLoginBar from './components/langLoginBar/LangLoginBar';
import InfoContacts from './components/infoContacts/InfoContacts';
import SectionMenu from './components/sectionMenu/SectionMenu';
import AdvertBlock from './components/advert/AdvertBlock';

function App() {
  return (
    <div className="App-wrapper">
      <Provider store={store}>
        <LangLoginBar />
        <InfoContacts />
        <SectionMenu />
        <AdvertBlock />
      </Provider>
    </div>
  );
}

export default App;