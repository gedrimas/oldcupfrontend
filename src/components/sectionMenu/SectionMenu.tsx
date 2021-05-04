import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import '../../styles/App.css'
import { fetchSections } from '../../reduxAppStore/reducers/sectionSlice'
import { RootState } from '../../reduxAppStore/rootReducer'

const SectionMenu: React.FC = () => {
  const dispatch = useDispatch()

  //fetch data for sectionMenu component
  useEffect(() => {
    dispatch(fetchSections())
  }, [dispatch])

  //get sections form Redux store
  const sections = useSelector((state: RootState) => state.sections.allsections)

  //get current language from Redux store
  const currentLanguage = useSelector((state: RootState) => state.language.lang)

  //make sections chip-buttons from sections array
  function sectionsComponents() {
    return sections.map((item) => (
      <Chip label={item[currentLanguage]} key={item._id} variant="outlined" />
    ))
  }
  return <div className="SectionMenu-wrapper">{sectionsComponents()}</div>
}

export default SectionMenu
