import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import '../../styles/App.css'
import { ImageKit } from './ImageKit'
import { Link } from 'react-router-dom'

interface AdvertCardProps {
  mainPhotoUrl: string
  advertId: string
  photoWidth: number
}

export const AdvertCard: React.FC<AdvertCardProps> = ({
  mainPhotoUrl,
  advertId,
  photoWidth,
}) => {
  return (
    <Link to={`/advert/${advertId}`}>
      <Card>
        <CardActionArea>
          {photoWidth && (
            <ImageKit photoUrl={mainPhotoUrl} width={photoWidth} />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}
