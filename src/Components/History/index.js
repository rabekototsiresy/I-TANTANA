import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Container from '@material-ui/core/Container'
import { Grid, Divider, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom'
import { FirebaseContext } from './../Firebase'


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


const style = {
  span: {
    padding: '10px 15px',
    border: '1px solid black',
    borderRadius: '5px',
    background: 'darkcyan',
    color: 'white'
  }, div: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'

  }

}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Historiques
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Motif</TableCell>
                    <TableCell>Price</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.totalSpend.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.motif}
                      </TableCell>
                      <TableCell>{historyRow.price}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function History(props) {

  const [rows, setRow] = useState([])
  const firebase = useContext(FirebaseContext)
  const [paginnationNumber, setPaginnationNumber] = useState(null)
  const [hitoryTab, setHitoryTab] = useState([])
  const [pageDisplay, setPageDisplay] = useState([])
  const [displayPagination, setDisplayPagination] = useState('')

  useEffect(() => {
   
    let page = parseInt(props.match.params.page)
    firebase.getHistory()
      .then((collection) => {
        if (collection) {
          let tabTemp = []
          collection.docs.map(doc => tabTemp.push(doc.data()))
          // setRow(tabTemp)

          setPaginnationNumber(tabTemp.length)

console.log("nombre donne total" + paginnationNumber)
          setRow(tabTemp.slice((page - 1) * 5, page * 5))
          //     setPageDisplay()
          //  console.log(pageDisplay)


        } else {
          console.log("EMPTY COLLECTION")
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [rows, pageDisplay])
  // const rows = [
  //   {
  //     date: '12/01/2020',
  //     history: [{ motif: 'Pain', price: '2000' }]
  //   },
  //   {
  //     date: '12/01/2020',
  //     history: [{ motif: 'Karoty', price: '2000' }]
  //   },
  //   {
  //     date: '12/01/2020',
  //     history: [{ motif: 'Menakey', price: '2000' }, { motif: 'Café', price: '300' }]
  //   },

  // ]
  const displayHistoriques = rows.length !== 0 ? rows.map((row, index) => (
    <Row key={index} row={row} />
  )) : <Typography component="span" variant="h6">Historique non disponible</Typography>


  const displayPaginnation = paginnationNumber !== null ? (

    rows.map((val, index) => {


      return (<Link to={`/history/${index + 1}`}>
        <span style={style.span}>1</span>
      </Link>)

    })
  ) : <span>Chargement</span>


  {/* <Pagination count={Math.trunc(paginnationNumber/10) == 0 ? 1 : Math.trunc(paginnationNumber/10)} color="primary" style={{position: 'fixed',bottom: '20px'}} />
 */}


  const disp = () => {
    const nb = paginnationNumber % 10
    if (nb == 0) {
      let tabTemp = []
      for (let i = 1; i < (paginnationNumber / 5 )+ 1; i++) {
        tabTemp.push(
          <Link to={`/history/${i}`} >
            <span style={style.span}>{i}</span>
          </Link>
        )
      }
      return tabTemp
    } else {
      let tabTemp = []
      for (let i = 1; i < (paginnationNumber / 5) + 1; i++) {
        tabTemp.push(
          <Link to={`/history/${i}`} style={{textDecoration: 'none'}}>
            <span style={style.span}>{i }</span>
          </Link>
        )
      }
      return tabTemp
    }
  }

  const numPage = props.match.params.page && props.match.params.page
  return (

    <Container style={{ marginTop: '20px' }}>
      <Grid
        direction="column"
        justify="center"
        alignItems="center"
        container
      >
        <Grid item container
          container
          direction="row"
          justify="center"
          alignItems="center"

        >


          <Typography component="h5" variant="h5" color="secondary">HISTORIQUES({numPage})</Typography>
         

        </Grid>
        <Divider />
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date de l'operation</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              displayHistoriques
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item container
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ marginTop: '20px' }}
      >


        <Grid item  >

          <div style={style.div}>
            {/* {displayPaginnation} */}
            {disp().map(val => (
              val
            ))}
          </div>

        </Grid>
        <Grid style={{ textAlign: "center", marginTop: '30px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="secondary">
              HOME
          </Button>
          </Link>

        </Grid>
      </Grid>

    </Container>


  );
}