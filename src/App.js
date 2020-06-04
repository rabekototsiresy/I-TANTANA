import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Welcome from './Components/Welcome';
import Spend from './Components/Spend';
import Test from './Components/Test';
import Rest from './Components/Rest';
import History from './Components/History';
import Home from './Components/Home';
import Salary from './Components/Salary';

const App = () => {

  return (
    <div>
      <BrowserRouter>
       
        <Switch>
          
          <Route exact path="/"  component={Welcome} />   
          <Route  path="/spend"  component={Spend} />   
          <Route  path="/rest"  component={Rest} />   
          <Route  path="/history/:page"  component={History} />    
          <Route  path="/paycoin"  component={Salary} />  
          {/* <Route exact path="/test"  component={Test} />    */}

        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
