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
import Modal from '../sharedComponents/Modal'
import {
  openModal,
  setModalContentType,
  setModalProps,
} from '../../reduxAppStore/reducers/modalSlice'
import CreateNewEntityButton from '../sharedComponents/createNewEntity'

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

  //chek isLogin
  const isLogin = useSelector((state: RootState) => state.login.isLogin)

  //get modal status
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)

  //open modal to confirm sections deletion
  function openConfirmDelSctionModal(_id: string) {
    dispatch(
      setModalProps({
        sectionId: _id,
        modalText:
          'Are you sure to delete that section and all advertisements in it?',
        endPoint: '/section',
      }),
    )
    dispatch(setModalContentType('confirmDelForm'))
    dispatch(openModal())
  }

  //make sections chip-buttons from sections array
  function sectionsComponents() {
    const allSections = sections.map((item) => {
      const { _id } = item
      return (
        <Chip
          onClick={() => choseSection(_id)}
          label={item[currentLanguage]}
          key={_id}
          variant="outlined"
          style={highLightSection(_id)}
          className={`${classes.customChip}`}
          icon={isLogin ? <EditIcon fontSize="small" /> : undefined}
          onDelete={isLogin ? () => openConfirmDelSctionModal(_id) : undefined}
        />
      )
    })

    if (isLogin)
      allSections.unshift(<CreateNewEntityButton entityType="newSection" />)
    return allSections
  }
  return (
    <div className="SectionMenu-wrapper">
      <Modal open={isModalOpen} />
      {sectionsComponents()}
    </div>
  )
}

export default SectionMenu
