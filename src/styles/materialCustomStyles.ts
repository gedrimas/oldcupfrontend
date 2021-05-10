import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  customChip: () => ({
    borderWidth: '3px',
    color: '#5d5d5f',
  }),
  advertPaper: () => ({
    margin: '1rem',
  }),
  advertInfoPaper: () => ({
    padding: '0.5rem',
    color: '#5d5d5f',
  }),
  advertInfoContent: () => ({
    margin: '0 1rem',
    '& span': {
      fontSize: '1.3rem',
    },
  }),
  price: () => ({
    marginLeft: '0.5rem',
  }),
})

export default useStyles
