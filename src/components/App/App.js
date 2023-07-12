import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import ReactRouterDom, { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import SavedPage from '../SavedPage/savedPage'
import ListPage from '../ListPage/ListPage'
import fetchItems from '../../apiCall'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: "",
      tripSelection: "",
      packItems: [],
      selectedItems: []
    }
  }

  createList = () => {
    const { tripSelection } = this.state;
    fetchItems(tripSelection)
      .then(data => {
        this.setState({ packItems: data })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  onChange = (event) => {
    this.setState({ tripSelection: event.target.value })
  }

  componentDidCatch(error) {
    this.setState({ error: error.toString() });
  }

  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      if (selectedItems.includes(itemId)) {
        return { selectedItems: selectedItems.filter((id) => id !== itemId) }
      } else {
        return { selectedItems: [...selectedItems, itemId] }
      }
    })
  }


  render() {
    const { error } = this.state;
    const { items, selectedItems } = this.state;

    return (
      <main className='main'>
        <Header />
        <Switch>
          <Route exact path='/' component={() =>
            <Home onChange={this.onChange} createList={this.createList} value={this.state.tripSelection} />}
          />
          <Route exact path='/lists'>
            <ListPage
              items={items}
              selectedItems={selectedItems}
              fetchItems={this.fetchItems}
              handleCheckboxChange={this.handleCheckboxChange}
            />
          </Route>
          <Route exact path='/mylist' component={SavedPage} />
          <Route path='*' render={() => <Error error={error} />} />
        </Switch>
      </main>
    );
  }
}

export default App