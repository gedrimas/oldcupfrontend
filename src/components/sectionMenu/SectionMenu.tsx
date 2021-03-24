import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/App.css';
import { fetchSections } from '../../reduxAppStore/reducers/sectionSlice';

const SectionMenu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSections());
  });

  return <div className="SectionMenu-wrapper">SectionMenu</div>;
};

export default SectionMenu;
