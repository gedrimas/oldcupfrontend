import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import useStyles from '../../styles/materialCustomStyles'
import '../../styles/App.css'
import {
  fetchSections,
  setActiveSection,
} from '../../reduxAppStore/reducers/sectionSlice'
import { RootState } from '../../reduxAppStore/rootReducer'
import { Adverts } from '../../api/responsesTypes'
import Api from '../../api/api'
import { setAllAdverts } from '../../reduxAppStore/reducers/advertsSlice'

const SectionMenu: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

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

  //chose a section
  const choseSection = (sectionId: string) => {
    dispatch(setActiveSection(sectionId))
  }

  //fetch adverts of first section for display them as a default
  useEffect(() => {
    if (!sections) return
    const firstSectionId = sections[0]?._id

    async function getAdvertsOfFirstSection() {
      try {
        const {
          data: { allAdverts: adverts },
        } = await new Api<Adverts>('get', `adverts/${firstSectionId}`).response
        dispatch(setAllAdverts(adverts))
      } catch (error) {
        console.log('Err', error)
      }
    }
    getAdvertsOfFirstSection()

    //and highlight appropriate section
    dispatch(setActiveSection(firstSectionId))
  }, [sections, dispatch])

  //fetch adverts according to the chosen section and put them in Redux store
  useEffect(() => {
    async function getAdverts() {
      try {
        const {
          data: { allAdverts: adverts },
        } = await new Api<Adverts>('get', `adverts/${activeSection}`).response
        dispatch(setAllAdverts(adverts))
      } catch (error) {
        console.log('Err', error)
      }
    }
    getAdverts()
  }, [activeSection, dispatch])

  //make sections chip-buttons from sections array
  function sectionsComponents() {
    return sections.map((item) => (
      <Chip
        onClick={() => choseSection(item._id)}
        label={item[currentLanguage]}
        key={item._id}
        variant="outlined"
        style={highLightSection(item._id)}
        className={`${classes.customChip}`}
      />
    ))
  }
  return <div className="SectionMenu-wrapper">{sectionsComponents()}</div>
}

export default SectionMenu
