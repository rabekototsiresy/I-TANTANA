import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
const Home = () => {
  return (
    <Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    style={{ height: '100vh' }}
  >
    <Grid>
    <IconButton
      aria-label="add"
      />
      <HomeIcon />
    </Grid>

  </Grid>
  )
}

export default Home
