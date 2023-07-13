import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import ReactRouterDom, { Route, Switch, withRouter } from 'react-router-dom'
import Home from '../Home/Home'
import SavedPage from '../SavedPage/savedPage'
import ListPage from '../ListPage/ListPage'
import fetchItems from '../../apiCall'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: "",
      tripSelection: "",
      packItems: [],
      selectedItems: [],
      listName: "",
    }
  }

  createList = () => {
    const { tripSelection } = this.state;
    fetchItems(tripSelection)
      .then(data => {
        this.setState({ packItems: data.data.items })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.packItems !== this.state.packItems) {
      this.props.history.push('/lists')
    }
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

  handleNameChange = (event) => {
    const { value } = event.target
    this.setState({ listName: value })
  }

  resetState = () => {
    this.setState({
      selectedItems: [],
      listName: ''
    })
  }

  render() {
    const { error, packItems, selectedItems, listName } = this.state;



    return (
      <main className='main'>
        <Header />
        <Switch>
          <Route exact path='/' component={() =>
            <Home onChange={this.onChange} createList={this.createList} value={this.state.tripSelection} />}

          />
          <Route exact path='/lists'>
            <ListPage
              packItems={this.state.packItems}
              selectedItems={this.state.selectedItems}
              handleCheckboxChange={this.handleCheckboxChange}
              handleNameChange={this.handleNameChange}
              listName={this.state.listName}
              resetState={this.resetState}
            />

          </Route>

          <Route exact path='/mylist' component={SavedPage} />
          <Route path='*' render={() => <Error error={error} />} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App)