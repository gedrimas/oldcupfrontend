import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import EuroIcon from '@material-ui/icons/Euro'
import { useSelector } from 'react-redux'
import { RootState } from '../../../reduxAppStore/rootReducer'
import { ImageKit } from '../ImageKit'
import useStyles from '../../../styles/materialCustomStyles'
import Divider from '@material-ui/core/Divider'
import { useEffect, useState, createRef } from 'react'

const AdvertPage = () => {
  //get advertId from url
  const { advertId } = useParams<{ advertId: string }>()

  const classes = useStyles()

  const allAdverts = useSelector(
    (state: RootState) => state.advertisements.allAdverts,
  )

  //get current language from Redux store
  const currentLanguage = useSelector((state: RootState) => state.language.lang)

  //find advert by id
  const advert = allAdverts.filter((item) => item._id === advertId)[0]

  //component with info about advert and price
  const advertInfo = (
    <Paper
      key="123"
      elevation={3}
      className={`${classes.advertPaper} ${classes.advertInfoPaper}`}
    >
      <Grid container justify="space-between" alignItems="center" wrap="nowrap">
        <Grid item xs={9}>
          {advert ? advert[currentLanguage] : null}
        </Grid>

        <Grid item xs={3}>
          <Grid container justify="flex-end">
            <Divider orientation="vertical" flexItem />
            <Grid item>
              <Grid
                container
                wrap="nowrap"
                justify="space-evenly"
                alignItems="center"
              >
                <span className={`${classes.price}`}>
                  {' '}
                  {advert ? advert.price : null}{' '}
                </span>
                <EuroIcon fontSize="small" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )

  const [imgContainerWidth, setImgContainerWidth] =
    useState<null | number>(null)

  let ref = createRef<HTMLDivElement>()

  useEffect(() => {
    if (ref.current) {
      const containerWidth = ref.current.clientWidth

      if (containerWidth > 700) {
        setImgContainerWidth(600)
      } else {
        const width = containerWidth / 1.2
        setImgContainerWidth(width)
      }
    }
  }, [])

  const advertInfoAndPhotos = () => {
    return advert.allPhotos.map((item, i) => {
      if (!item) return null
      if (i === 0) return advertInfo
      return (
        <>
          {imgContainerWidth && (
            <ImageKit photoUrl={item} width={imgContainerWidth} />
          )}
        </>
      )
    })
  }

  return (
    <Grid container justify="center" ref={ref}>
      <Grid container direction="column" alignItems="center">
        <Grid item>{advert ? advertInfoAndPhotos() : null}</Grid>
      </Grid>
    </Grid>
  )
}

export default AdvertPage
