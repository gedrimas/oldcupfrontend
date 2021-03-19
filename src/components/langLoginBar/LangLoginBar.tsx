import React from 'react';
import ru from '../../icons/ru.svg';
import ee from '../../icons/ee.svg';
import '../../styles/App.css';

const LangLoginBar = () => {
  return (
    <div className="LangLoginBar-wrapper">
      LangLonginBar
      <img src={ru} alt="ru" style={{ height: 30 }} />
      <img src={ee} alt="ee" style={{ height: 30 }} />
    </div>
  );
};

export default LangLoginBar;
