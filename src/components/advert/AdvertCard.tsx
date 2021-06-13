import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import '../../styles/App.css'
import { ImageKit } from './ImageKit'
import { Link } from 'react-router-dom'
import useStyles from '../../styles/materialCustomStyles'
import { useSelector } from 'react-redux'
import { RootState } from '../../reduxAppStore/rootReducer'
import Divider from '@material-ui/core/Divider'
import EuroIcon from '@material-ui/icons/Euro'
import Grid from '@material-ui/core/Grid'

interface AdvertsInfo {
  ru: string
  ee: string
  price: string
}

interface AdvertCardProps {
  mainPhotoUrl: string
  advertId: string
  photoWidth: number
  info: AdvertsInfo
}

export const AdvertCard: React.FC<AdvertCardProps> = ({
  mainPhotoUrl,
  advertId,
  photoWidth,
  info,
}) => {
  const classes = useStyles()

  //get current language from Redux store
  const currentLanguage = useSelector((state: RootState) => state.language.lang)

  return (
    <Link to={`/advert/${advertId}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          {photoWidth && (
            <ImageKit photoUrl={mainPhotoUrl} width={photoWidth} />
          )}
          <CardContent className={`${classes.cardContent}`}>
            <Grid container alignItems="center" justify="flex-end">
              <span className={`${classes.price}`}>{info.price}</span>
              <EuroIcon fontSize="small" />
            </Grid>
            <Typography color="textSecondary" component="span">
              {info[currentLanguage]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
