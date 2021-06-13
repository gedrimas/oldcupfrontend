import Chip from '@material-ui/core/Chip'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import useStyles from '../../styles/materialCustomStyles'
import Grid from '@material-ui/core/Grid'

interface CreateNewEntity {
  entityType: 'newSection' | 'newAdvert'
  dimention?: number
}

const CreateNewEntityButton: React.FC<CreateNewEntity> = ({
  entityType,
  dimention,
}) => {
  const classes = useStyles()
  const newSectionChipButton = (
    <Chip
      onClick={() => console.log(1111)}
      label="New Section"
      key={'newSection'}
      variant="outlined"
      style={{ borderColor: '#ff4d76', color: '#ff4d76' }}
      className={`${classes.createChip}`}
    />
  )

  const newAdvertButton = (
    <Card>
      <CardActionArea>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ height: `${dimention}px`, color: '#ff4d76' }}
        >
          <Typography component="span">New Advertisment</Typography>
        </Grid>
        <CardContent className={`${classes.cardContent}`}></CardContent>
      </CardActionArea>
    </Card>
  )

  const getParticularButton = () => {
    switch (entityType) {
      case 'newSection':
        return newSectionChipButton
      case 'newAdvert':
        return newAdvertButton
    }
  }

  return <>{getParticularButton()}</>
}

export default CreateNewEntityButton
