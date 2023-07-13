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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      tripSelection: "",
      packItems: [],
      selectedItems: [],
      savedLists: [],
    };
    this.handleSaveList = this.handleSaveList.bind(this);
  }

  createList = () => {
    const { tripSelection } = this.state;
    fetchItems(tripSelection)
      .then(data => {
        this.setState({ packItems: data.data.items });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.packItems !== this.state.packItems) {
      this.props.history.push('/lists');
    }
  }

  onChange = (event) => {
    this.setState({ tripSelection: event.target.value });
  }

  componentDidCatch(error) {
    this.setState({ error: error.toString() });
  }

  handleCheckboxChange = (itemId) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      if (selectedItems.includes(itemId)) {
        return { selectedItems: selectedItems.filter((id) => id !== itemId) };
      } else {
        return { selectedItems: [...selectedItems, itemId] };
      }
    });
  }

  handleSaveList = (listName, listItems) => {
    const { savedLists } = this.state;
    const newList = {
      name: listName,
      items: listItems.map((itemId) => {
        const item = this.state.packItems.find((item) => item.id === itemId);
        return { ...item, packed: false };
      }),
    };
    this.setState((prevState) => ({
      savedLists: [...prevState.savedLists, newList],
    }));
  };
  

  render() {
    const { error, packItems, selectedItems, savedLists } = this.state;

    return (
      <main className='main'>
        <Header />
        <Switch>
          <Route exact path='/' component={() =>
            <Home onChange={this.onChange} createList={this.createList} value={this.state.tripSelection} />}
          />
          <Route exact path='/lists' component={() =>
            <ListPage
              packItems={packItems}
              selectedItems={selectedItems}
              fetchItems={this.fetchItems}
              handleCheckboxChange={this.handleCheckboxChange}
              handleSaveList={this.handleSaveList}
            />}
          />
          <Route exact path="/mylist" component={() =>
            <SavedPage savedLists={savedLists} />} />
          <Route path='*' render={() => <Error error={error} />} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
