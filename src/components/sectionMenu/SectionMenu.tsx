import React, { useEffect } from 'react';
import '../../styles/App.css';
import Api from '../../api/api';
import ResponsesTypes from '../../api/responsesTypes';

const SectionMenu = () => {
  useEffect(() => {
    const allsectionsUrl = 'allsections';
    const response = new Api<typeof allsectionsUrl>('get', allsectionsUrl)
      .response;
    if (!(response instanceof Error)) {
      response.then((response) => {
        const data = response.data.allsections;
      });
    }
  });

  return <div className="SectionMenu-wrapper">SectionMenu</div>;
};

export default SectionMenu;
