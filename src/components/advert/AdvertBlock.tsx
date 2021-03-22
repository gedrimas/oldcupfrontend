import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../../styles/App.css';
import img from './palanga-22.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: '100%',
  },
});

export function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
          height="140"
          alt="Photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const AdvertBlock = () => {
  return (
    <div className="AdvertBlock-wrapper">
      <div className="Advert-column">
        <MediaCard />
      </div>
      <div className="Advert-column">
        <MediaCard />
      </div>
      <div className="Advert-column">
        <MediaCard />
      </div>
      <div className="Advert-column">
        <MediaCard />
      </div>
    </div>
  );
};

export default AdvertBlock;