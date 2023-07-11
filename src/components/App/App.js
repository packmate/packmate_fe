import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: "",
    }
  }

  render() {
    return(
      <main className='main'>
        <Header />
        <Switch>
          <Route exact path='/' render={ () => {
            <Home />} }
          />
          {/* <Route exact path='/items' render={ }
          /> */}
          {/* <Route exact path='/user-lists' render={ }
          /> */}
          <Route exact path='*' render={ () => 
            <Error error={this.state.error}/> }
          /> 
        </Switch>
      </main>
    ) 
  }
}

export default App