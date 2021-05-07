import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import '../../styles/App.css'
import img from './palanga-22.jpg'
import { ImageKit } from './ImageKit'
import { MediaCard } from './AdvertCard'
import { RootState } from '../../reduxAppStore/rootReducer'

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '100%',
  },
})

const AdvertBlock = () => {
  const allAdverts = useSelector(
    (state: RootState) => state.advertisements.allAdverts,
  )

  const normalizeAdvertArry = () => {
    let fake: unknown[] = []
    if (allAdverts.length % 4 > 0) {
      fake = [1, 2, 3].map((item) => (
        <div key={item} className="Advert-column"></div>
      ))
    }
    let cards = allAdverts.map((item, i, arr) => {
      return (
        <div className="Advert-column" key={item._id}>
          <MediaCard photoUrl={item.mainPhoto} />
        </div>
      )
    })

    return [...cards, ...fake]
  }

  const t = normalizeAdvertArry()
  console.log('t', t)

  return <div className="AdvertBlock-wrapper">{normalizeAdvertArry()}</div>
}

export default AdvertBlock
