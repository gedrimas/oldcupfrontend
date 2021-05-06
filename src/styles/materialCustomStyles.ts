import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  customChip: (props: any) => ({
    borderWidth: '3px',
    borderColor: props.borderColor,
  }),
})

export default useStyles
