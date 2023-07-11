import React from 'react';

class SavedListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedLists: [], 
      selectedList: null, 
    };
  }

  // componentDidMount() {
  // // TESTING
  //   const trip1 = {
  //     name: 'Trip 1',
  //     items: ['Item A', 'Item B', 'Item C'],
  //   };

  //   const trip2 = {
  //     name: 'Trip 2',
  //     items: ['Item X', 'Item Y', 'Item Z'],
  //   };

  //   this.setState({
  //     savedLists: [trip1, trip2],
  //   });
  // }

  handleSaveList = (listName, listItems) => {
    this.setState((prevState) => ({
      savedLists: [...prevState.savedLists, { name: listName, items: listItems }],
    }));
  };

  handleListClick = (listName) => {
    const selectedList = this.state.savedLists.find((list) => list.name === listName);
    this.setState({ selectedList });
  };

  render() {
    const { savedLists, selectedList } = this.state;

    return (
      <div>
        <h1>My List</h1>
        {savedLists.length === 0 ? (
          <p>No list yet...</p>
        ) : (
          <div>
            <ul>
              {savedLists.map((list, index) => (
                <li key={index}>
                  <button onClick={() => this.handleListClick(list.name)}>{list.name}</button>
                </li>
              ))}
            </ul>
            {selectedList && (
              <div>
                <h2>List Items</h2>
                <ul>
                  {selectedList.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default SavedListPage;