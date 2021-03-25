import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchContacts } from '../../reduxAppStore/reducers/contactsSlice';
import '../../styles/App.css';

const InfoContacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  });
  return <div className="InfoContact-wrapper">InfoContact</div>;
};

export default InfoContacts;
