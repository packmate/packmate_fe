import React from 'react'
import './App.css'
import Error from '../Error/Error'
import Header from '../header/Header'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from '../Home/Home'
import SavedPage from '../SavedPage/savedPage'
import ListPage from '../ListPage/ListPage'
import fetchItems from '../../apiCall'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: "",
      tripSelection: "",
      packItems: [],
      selectedItems: [],
      savedLists: [],
      listName: "",
      formValid: false
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
      setTimeout(() => {
        this.setState({ tripSelection: "" });
      }, 2000)
  }

  componentDidUpdate(prevState) {
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
      let updatedSelectedItems;
      if (selectedItems.includes(itemId)) {
        updatedSelectedItems = selectedItems.filter((id) => id !== itemId);
      } else {
        updatedSelectedItems = [...selectedItems, itemId];
      }
      return { selectedItems: updatedSelectedItems };
    }, () => {
      const { listName, selectedItems } = this.state;
      const isFormValid = listName.trim() !== "" && selectedItems.length >= 1;
      this.setState({ formValid: isFormValid });
    });
  };




  handleSaveList = (listName, selectedItems) => {
    const { packItems } = this.state;
    const newList = selectedItems.map((itemId) => {
      const item = packItems.find((item) => item.id === itemId);
      return { ...item, packed: false };
    });
    this.setState((prevState) => ({
      savedLists: [...prevState.savedLists, { name: listName, items: newList }],
    }));
  };

  handleNameChange = (event) => {
    this.setState({ listName: event.target.value });
    const { selectedItems } = this.state;
    const isFormValid = event.target.value.trim() !== "" && selectedItems.length >= 1;
    this.setState({ formValid: isFormValid });
  }

  resetState = () => {
    this.setState({
      selectedItems: [],
      listName: '',
      formValid: false
    })
  }

  render() {
    const { error, savedLists } = this.state;

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
              handleSaveList={this.handleSaveList}
              handleNameChange={this.handleNameChange}
              listName={this.state.listName}
              resetState={this.resetState}
              formValid={this.state.formValid}
            />
          </Route>
          <Route exact path="/mylist" component={() =>
            <SavedPage savedLists={savedLists} />} />
          <Route exact path='/mylist' component={SavedPage} />
          <Route path='*' render={() => <Error error={error} />} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);