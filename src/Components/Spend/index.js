import React, { useState, Fragment,useEffect,useContext } from 'react'
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
import {Link} from 'react-router-dom'
import {FirebaseContext} from './../Firebase'
import swal from 'sweetalert'
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
const Spend = (props) => {
  const [fields, setFields] = useState([{ motif: null, price: null }])
  
  const [date, setDate] = useState(null)
  const [salaire, setSalaire] = useState(null)
  const firebase = useContext(FirebaseContext)

  useEffect( ()=>{
   
    getSeconde()
    let today = new Date()
    setDate(`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`)
    firebase.getSalary()
  .then( collection=>{
    if(collection){
      setSalaire(collection.data())
  
    }else {
      console.log("collectio vide")
    }
  })
  .catch( err=>{
    console.log(err)
  })
  },[salaire])
  const handleMotif = (index, e) => {
    const values = [...fields]
    values[index].motif = e.target.value
    setFields(values)
  }
  const handlePrice = (index, e) => {
    const values = [...fields]
    values[index].price = e.target.value
    setFields(values)
  }
  const handleAdd = () => {
    const values = [...fields]
    values.push({ motif: null, price: null })
    setFields(values)
  }
  const handleRemove = (i) => {
    const values = [...fields]
    values.splice(i,1)
    setFields(values)
  }

  const somme = ()=>{
    let priceTab=  []
      fields.filter(val=>{
        priceTab.push(parseInt(val.price))
      })

      let total = 0
      priceTab.map( val=>{
        total +=val
      })

      return total
  }


  function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
  }

  const getSeconde = ()=>{
    let today = new Date()
    let h = (24 - today.getHours()) * 60 * 60 
    let min = (60 - today.getMinutes()) * 60
    let s = 60 - today.getSeconds() 
    return parseInt(h)+parseInt(min)+parseInt(s)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    // document.cookie=`totalSpend=${somme()}`
  
    if( parseInt(salaire.salary) - parseInt(somme())>=0){
      firebase.updateSalary(parseInt(salaire.salary) - parseInt(somme()))
      .then( doc=>{
      
        console.log("updated succeful")
      })
      .catch( err=>{
        console.log(err)
      })

      firebase.addSpend( date,fields)
      .then( doc=>{getSeconde()
        document.cookie = `spendToday=true;max-age=${getSeconde()}`
        document.cookie=`spendTodayId=${doc.id};max-age=${getSeconde()}`
        swal({
          title: "Opération éfféctué!",
          text: "cliquez le bouton pour continuer",
          icon: "success",
          button: "ok!",
        });
        props.history.push('/rest')
  
        console.log("added succeful")
      })
      .catch( err=>{
        console.log(err)
      })
    }else{
      swal({
        title: "Solde insuffisant!!",
        text: "cliquez le bouton pour revenir en arrière",
        icon: "warning",
        button: "ok!",
      });
      
    }
    
    // if(getCookie('spandToday') !=='undefined' &&  getCookie('spendTodayId') !=='undefined'){
    //   alert("Mis a joour depense")
    //   firebase.updateSpendToday(date,fields,getCookie('spendTodayId'))
    //   .then( doc=>{
    //     props.history.push('/rest')
    //       console.log("updated succeful")
    //   })
    //   .catch( err=>{
    //     console.log(err)
    //   })


    // }else{
    //   alert("AJOUT NOUVEAU DEPENSE")
    //   firebase.addSpend( date,fields)
    //   .then( doc=>{getSeconde()
    //     document.cookie = `spendToday=true;max-age=${getSeconde()}`
    //     document.cookie=`spendTodayId=${doc.id};max-age=${getSeconde()}`
    //     props.history.push('/rest')
  
    //     console.log("added succeful")
    //   })
    //   .catch( err=>{
    //     console.log(err)
    //   })
    // }



    
  }
const displaySalary = salaire !== null ? salaire.salary : '.......'

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item md={6} xs={12} style={{ margin: '0 20px' }}>
        <Grid item container
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >

          <IconButton
            aria-label="add"
            onClick={handleAdd}

          >
            <AddIcon />
          </IconButton>
          <Typography style={{fontWeight: 'bold'}}>{date} </Typography>
          <Chip
            icon={<MonetizationOnIcon />}
            label={`${displaySalary} ariary`}
            color="primary"
          />

        </Grid>
        <Divider />
        <Grid style={style.form}>
          <form noValidate
            autoComplete="off"
            style={style.content}
            onSubmit={handleSubmit}
          >

            <Grid item container
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ marginBottom: '20px' }}
            >
              {
                fields.map((field, index) => {
                  return (
                    <Grid  container
                    container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              key={index}>
                      <TextField
                        label="Motif"
                        onChange={e => handleMotif(index, e)}

                      />
                      <TextField
                        label="Price"
                        onChange={e => handlePrice(index, e)}
                      />
                       <IconButton
                        aria-label="add"
                        onClick={()=>handleRemove(index)}
                        color="secondary"
                        
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      
                    </Grid>

                  )
                })
              }
            </Grid>
            {/* <Link to="/rest"> */}
            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              valider
            </Button>
            {/* </Link> */}
          </form>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Spend
