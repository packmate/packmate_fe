import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import ReactRouterDom, { Route, Switch, Redirect } from 'react-router-dom'
import Home from '../Home/Home'
import SavedPage from '../SavedPage/savedPage'
import ListPage from '../ListPage/ListPage'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: "",
    }
  }

  componentDidCatch(error) {
    this.setState({ error: error.toString() });
  }

  render() {
    const { error } = this.state;

    return (
      <main className='main'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/createlist' component={ListPage} /> */}
          <Route exact path='/mylist' component={SavedPage} />
          <Route path='/error' render={() => <Error error={error} />} />
          <Redirect to='/error' />
        </Switch>
      </main>
    );
  }
}

export default App