import { makeStyles } from "@material-ui/core"
import { deepPurple } from "@material-ui/core/colors"


export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px'
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none'
      },
      image: {
        marginLeft: '15px',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px'
      },
      profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px'
      },
      appBarSearch: {
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
      },
      pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
      },
      gridContainer: {
        [theme.breakpoints.down('xs')]: {
          flexDirection: 'column-reverse',
        },
      },
      userName: {
        display: 'flex',
        alignItems: 'center'
      },
      purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]
      },
      [theme.breakpoints.down('sm')]:
      {
        mainContainer: {
          flexDirection : "column-reverse"
        }
      }
     
}))

