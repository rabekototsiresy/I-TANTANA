import React, { useState, Fragment, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Link } from 'react-router-dom'
import { FirebaseContext } from './../Firebase'
import swal from 'sweetalert'

const Salary = (props) => {
const [salary, setSalary] = useState('')
const [salaryDb, setSalaryDb] = useState('')
const firebase = useContext(FirebaseContext)


useEffect(() => {
  firebase.getSalary()
  .then( collection=>{
    if(collection){
      setSalaryDb(collection.data().salary)
      console.log(salaryDb)
    }else {
      console.log("collectio vide")
    }
  })
  .catch( err=>{
    console.log(err)
  })
}, [salaryDb])




const handleSalary = e=>{
  setSalary(e.target.value)
}

const handleSubmit = e=>{
  e.preventDefault()

  let sommeSalary = parseInt(salaryDb) + parseInt(salary)
  firebase.updateSalary(sommeSalary)
  .then( succ=>{
    swal({
      title: "Opération éfféctué!",
      text: "cliquez le bouton pour quitter",
      icon: "success",
      button: "ok!",
    });
  })

  .catch( err=>{
    console.log(err)
  })

}


const displayRest = salaryDb ?<Typography variant="h3" component="h3"> {`${salaryDb}`} ariary</Typography> : <Typography variant="body" component="p">veuillez patienter</Typography>
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
{displayRest}
<Grid item>
        
        </Grid>
      <Grid item>
        <form noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
       
        >

          <TextField
            label="Salary"
            value={salary}
            onChange={handleSalary}
          />

         <Grid item container justify="center">
         <Button
            variant="contained"
            color="secondary"
            type="submit"
            style={{margin: '20px 0'}}
          >
            valider
            </Button>
         
            </Grid>
        </form>
       
           <Grid item container justify="center" >
          <Link to="/">
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Home
            </Button>
          </Link>
           </Grid>
      </Grid>
    </Grid>
  )
}

export default Salary
