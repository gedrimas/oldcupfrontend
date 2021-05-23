import React, { useEffect, useRef } from 'react'
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
import Api, { apiRespType } from '../../api/api'
import {
  setAllAdverts,
  setPending,
} from '../../reduxAppStore/reducers/advertsSlice'
import { setError } from '../../reduxAppStore/reducers/errorSlice'
import EditIcon from '@material-ui/icons/Edit'

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

  //fetch adverts of first section for display them as default
  useEffect(() => {
    if (!sections) return
    const firstSectionId = sections[0]?._id

    async function getAdvertsOfFirstSection() {
      try {
        dispatch(setPending(true))
        //fetch data
        const response = await new Api<Adverts>(
          'get',
          `/adverts/${firstSectionId}`,
        ).sendRequest()

        //if response error
        if (!apiRespType(response)) {
          throw response
        }

        //get adverts fron response
        const {
          data: { allAdverts: adverts },
        } = response

        //put data into Redux store (adverts)
        dispatch(setAllAdverts(adverts))
      } catch (error) {
        //set Error info Redux store (error)
        dispatch(setError(error))
      } finally {
        dispatch(setPending(false))
      }
    }
    getAdvertsOfFirstSection()

    //and highlight appropriate section
    dispatch(setActiveSection(firstSectionId))
  }, [sections, dispatch])

  const ref = useRef(false)

  //fetch adverts according to the chosen section and put them in Redux store
  useEffect(() => {
    async function getAdverts() {
      try {
        //fetch data
        const response = await new Api<Adverts>(
          'get',
          `adverts/${activeSection}`,
        ).sendRequest()

        //if response error
        if (!apiRespType(response)) {
          throw response
        }

        //get adverts from response
        const {
          data: { allAdverts: adverts },
        } = response

        //put adverts to Reux store
        dispatch(setAllAdverts(adverts))
      } catch (error) {
        //set Error info Redux store (error)
        dispatch(setError(error))
      } finally {
        dispatch(setPending(false))
      }
    }

    //blok request after first render
    if (ref.current) {
      getAdverts()
    } else {
      ref.current = true
    }
  }, [activeSection, dispatch])

  //delete section and all adverts under that section
  const deleteSction = () => {
    console.log(11111)
  }

  //chek isLogin
  const isLogin = useSelector((state: RootState) => state.login.isLogin)

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
        icon={isLogin ? <EditIcon fontSize="small" /> : undefined}
        onDelete={isLogin ? deleteSction : undefined}
      />
    ))
  }
  return <div className="SectionMenu-wrapper">{sectionsComponents()}</div>
}

export default SectionMenu
