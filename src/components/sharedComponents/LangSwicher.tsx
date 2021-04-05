import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reduxAppStore/rootReducer';
import Grid from '@material-ui/core/Grid';
import ru from '../../icons/ru.svg';
import ee from '../../icons/ee.svg';
import { changeLang } from '../../reduxAppStore/reducers/langSlice';
import '../../styles/App.css';

const LangSwicher: React.FC = () => {
  const dispatch = useDispatch();

  //get current language from Redux store
  const currentLanguage = useSelector(
    (state: RootState) => state.language.lang
  );

  //select language icon baised on value from Redux store
  const selectLangIcon = () => {
    if (currentLanguage === 'ru') {
      return ru;
    }
    return ee;
  };

  //change language
  const changeLanguage = () => {
    dispatch(changeLang());
  };

  return (
    <Grid item id="langIcon" onClick={changeLanguage}>
      <img src={selectLangIcon()} alt="ru" />
    </Grid>
  );
};

export default LangSwicher;
