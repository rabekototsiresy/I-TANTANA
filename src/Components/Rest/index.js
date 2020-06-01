import React,{useContext,useState,Fragment,useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {FirebaseContext} from './../Firebase'
import {Link} from 'react-router-dom'
const style = {
  content: {
    width: '100%'
  },
  main: {
    border: '2px solid black'
  },
  form: {
    marginTop: '20px'
  }
}
const Rest = () => {
  const firebase = useContext(FirebaseContext)
  const [salary, setSalary] = useState(null)



  
  const getCookie = name => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
  }
useEffect(() => {
  firebase.getSalary()
  .then( collection=>{
    if(collection){
      setSalary(collection.data())
    }else {
      console.log("empty collection")
    }
  })
  .catch( err=>{
    console.log(err)
  })
  
},[salary])
const rest = salary !== null ? salary.salary  : <span>veuillez patienter</span>
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item md={4} xs={12}  style={{margin: '0 20px'}}>
        <Grid item container
          container
          direction="row"
          justify="center"
          alignItems="center"
        >

          
          <Typography component="h5" variant="h5">RESTE</Typography>
          

        </Grid>
        <Divider />
        <Grid style={style.form}>
       
          <Grid item container
          container
          direction="row"
          style={{marginBottom: '20px'}}
          
        >
        
         <Card style={{width: '100%'}}>
     
        <CardContent >
          <Typography component="h5" variant="h5">
            {rest}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
          ariary
          </Typography>
        </CardContent>
       
    
      
    </Card>
        </Grid>
        <Link to="/spend" style={{textDecoration: 'none'}}>
        <Button 
        variant="contained" 
        color="primary"
        type="submit"
        style={{float: 'left'}}
        >
  Retour
</Button>
        </Link>
        <Link to="/history/1" style={{textDecoration: 'none'}}>
        <Button 
        variant="contained" 
        color="secondary"
        type="submit"
        style={{float: 'right'}}
        >
  Hitoriques
</Button>
        </Link>
          
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Rest
