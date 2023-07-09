import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { useMediaQuery } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    padding: '10px 50px',
    '@media (max-width: 956px)': {
      flexWrap: 'wrap',
      width: '100%'
    }
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  memoriesText: {
    '@media (max-width: 956px)': {
      maxWidth: '60%',
      height: 'auto',
    },
    '@media (max-width: 450px)': {
      maxWidth: '100%',
      height: 'auto',
    },
    
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px',
    width: '100%',
    '@media (max-width: 800px)': {
      width: '100%',
      margin:'auto'
    }
  },

  profile: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',    
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 'fit-content',
    paddingInline: '3px'
  },
  brandContainer: {
    textAlign: 'center',
    '@media (max-width: 800px)': {
      width: '100%',
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    
  },
  btn: {
    '@media (max-width: 956px)': {
      width: '100%',
    },
    '@media (max-width: 300px)': {
      width: '100px',
      margin: '-30px'
    }
  }
}));