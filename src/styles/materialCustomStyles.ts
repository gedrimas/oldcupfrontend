import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  customChip: {
    borderWidth: '3px',
    color: '#5d5d5f',
    '& .MuiChip-deleteIcon': {
      color: '#ff4d76',
    },
    '& svg': {
      color: '#ff4d76',
    },
  },
  createChip: {
    borderColor: '#ff4d76',
    color: '#ff4d76',
  },
  advertPaper: {
    margin: '1rem',
  },
  advertInfoPaper: {
    padding: '0.5rem',
    color: '#5d5d5f',
  },
  advertInfoContent: {
    margin: '0 1rem',
    '& span': {
      fontSize: '1.3rem',
    },
  },
  price: {
    marginLeft: '0.5rem',
    fontSize: '1.3rem',
  },
  customIcon: {
    marginLeft: '0.3rem',
    color: '#ff4d76',
    cursor: 'pointer',
    fontSize: '1.3rem',
  },
  cardContent: {
    height: '7rem',
    overflow: 'auto',
    textDecoration: 'none',
  },
  createAdvert: {
    border: '1px solid #ff4d76',
    color: '#ff4d76',
    borderRadius: '4px',
  },
})

export default useStyles
