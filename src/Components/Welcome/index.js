import React,{useContext,useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {Link} from 'react-router-dom'
import {FirebaseContext} from './../Firebase'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
const style = {
  lading: {
    // border: "2px solid black",
    width: '200px',
    height: '200px',
    backgroundColor: '#1b6ca8',
    color: 'white',
    fontWeight: 'bolder',
    fontSize: '15px',
    
  },
  main: {
    height: '100vh',
    width: '100%'

  }
}
const Welcome = () => {
  

  
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
      style={style.main}

    >
     
      <Grid item>
      <Link to="/spend" style={{textDecoration: 'none'}}>
        <Paper 
        elevation={3} 
        style={style.lading} 
        >
          <Grid 
          item 
          container 
          direction="row"
          justify="center"
          alignItems="center" style={{ height: '200px' }}
          
          >
            DEPENSER
            <IconButton
            aria-label="add"
         

          >
            <AddShoppingCartIcon  fontSize="large" />
          </IconButton>
          </Grid>
       
          
          

        </Paper>
        </Link>
      </Grid>
     
 
      <Grid item>
      <Link to="/history/1" style={{textDecoration: 'none'}}>
        <Paper 
        elevation={3} 
        style={style.lading} 
        >
          <Grid 
          item 
          container 
          direction="row"
          justify="center"
          alignItems="center" style={{ height: '200px' }}>
            HISTORIQUE
            <IconButton
            aria-label="add"
         

          >
            <HistoryIcon  color="white" fontSize="large" />
          </IconButton>
          </Grid>
        </Paper>
        </Link>
      </Grid>
     

    </Grid>
  )
}

export default Welcome
