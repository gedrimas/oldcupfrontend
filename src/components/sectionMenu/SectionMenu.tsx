import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import '../../styles/App.css'
import {
  fetchSections,
  setActiveSection,
} from '../../reduxAppStore/reducers/sectionSlice'
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

  //get active section from Redux store
  const activeSection = useSelector(
    (state: RootState) => state.sections.activeSection,
  )

  //highLight section if it's chosen
  const highLightSection = (sectionId: string) => {
    if (sectionId === activeSection) {
      return {
        borderColor: 'rgba(0, 204, 255, 0.77)',
        borderWidth: '3px',
        boxShadow: '1px 2px 31px -4px rgba(31,232,239,0.92)',
      }
    }
    return { borderWidth: '3px' }
  }

  //chose section
  const choseSection = (sectionId: string) => {
    dispatch(setActiveSection(sectionId))
  }

  //make sections chip-buttons from sections array
  function sectionsComponents() {
    return sections.map((item) => (
      <Chip
        onClick={() => choseSection(item._id)}
        label={item[currentLanguage]}
        key={item._id}
        variant="outlined"
        style={highLightSection(item._id)}
      />
    ))
  }
  return <div className="SectionMenu-wrapper">{sectionsComponents()}</div>
}

export default SectionMenu
