import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import { Route, Switch } from 'react-router-dom'
import SavedListPage from '../SavedPage/savedPage'

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
          {/* <Route exact path='/' render={ }
          /> */}
          {/* <Route exact path='/items' render={ }
          /> */}
          {/* <Route exact path='/user-lists' render={ }
          /> */}
          {/* <Route exact path='*' component={SavedListPage} />  */}
          <Route exact path='*' render={ () => 
            <Error error={this.state.error}/> }
          /> 
        </Switch>
      </main>
    ) 
  }
}

export default App