import { useSelector } from 'react-redux'
import '../../styles/App.css'
import { AdvertCard } from './AdvertCard'
import { RootState } from '../../reduxAppStore/rootReducer'
import React, { useEffect, useState, createRef } from 'react'
import Grid from '@material-ui/core/Grid'
import CreateNewEntityButton from '../sharedComponents/createNewEntity'
import useStyles from '../../styles/materialCustomStyles'

const AdvertBlock = () => {
  const classes = useStyles()

  const allAdverts = useSelector(
    (state: RootState) => state.advertisements.allAdverts,
  )

  const [imgContainerWidth, setImgContainerWidth] =
    useState<null | number>(null)

  const ref = createRef<HTMLDivElement>()

  //get width for advert photo
  useEffect(() => {
    if (ref.current) {
      const containerWidth = ref.current.clientWidth
      setImgContainerWidth(containerWidth)
    }
  }, [ref])

  //chek isLogin
  const isLogin = useSelector((state: RootState) => state.login.isLogin)

  //return adverts cards
  const normalizeAdvertArray = () => {
    let fake: unknown[] = []
    //make every row with not less then 3 columns by addin empty div
    if (allAdverts.length % 3 > 0) {
      fake = [1, 2].map((item) => (
        <div key={item} className="Advert-column"></div>
      ))
    }

    //if logged in show button to add new advertising
    const isCreateBatton = (i: number) => isLogin && i === 0

    let cards = allAdverts.map((item, i) => {
      const { _id, mainPhoto, price, ru, ee } = item
      return (
        <>
          {isCreateBatton(i) && imgContainerWidth ? (
            <Grid
              className="Advert-column"
              key={_id + 'create'}
              ref={ref}
              style={{
                border: '1px solid #ff4d76',
                color: '#ff4d76',
                borderRadius: '4px',
              }}
            >
              <CreateNewEntityButton
                entityType="newAdvert"
                dimention={imgContainerWidth - 10}
              />
            </Grid>
          ) : null}
          <Grid className="Advert-column" key={_id} ref={ref}>
            {imgContainerWidth && (
              <AdvertCard
                mainPhotoUrl={mainPhoto}
                advertId={_id}
                photoWidth={imgContainerWidth - 20}
                info={{ price, ru, ee }}
              />
            )}
          </Grid>
        </>
      )
    })

    return [...cards, ...fake]
  }

  return <div className="AdvertBlock-wrapper">{normalizeAdvertArray()}</div>
}

export default AdvertBlock
