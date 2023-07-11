import React from 'react';

class SavedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedLists: [],
      selectedList: null,
    };
  }

  // componentDidMount() {
  //   // Simulating two trips
  //   const trip1 = {
  //     name: 'Trip 1',
  //     items: [
  //       { id: 1, name: 'Item A', packed: false },
  //       { id: 2, name: 'Item B', packed: false },
  //       { id: 3, name: 'Item C', packed: false },
  //     ],
  //   };

  //   const trip2 = {
  //     name: 'Trip 2',
  //     items: [
  //       { id: 4, name: 'Item X', packed: false },
  //       { id: 5, name: 'Item Y', packed: false },
  //       { id: 6, name: 'Item Z', packed: false },
  //     ],
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

  handleCheckboxChange = (listName, itemId) => {
    this.setState((prevState) => {
      const { savedLists } = prevState;
      const selectedListIndex = savedLists.findIndex((list) => list.name === listName);
      const selectedList = savedLists[selectedListIndex];
      const updatedItems = selectedList.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      const updatedList = { ...selectedList, items: updatedItems };
      const updatedSavedLists = [
        ...savedLists.slice(0, selectedListIndex),
        updatedList,
        ...savedLists.slice(selectedListIndex + 1),
      ];

      return {
        savedLists: updatedSavedLists,
      };
    });
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
                  {selectedList.items.map((item) => (
                    <li key={item.id}>
                      <label>
                        <input
                          type='checkbox'
                          checked={item.packed}
                          onChange={() => this.handleCheckboxChange(selectedList.name, item.id)}
                        />
                        {item.name}
                        {item.packed && <span style={{ marginLeft: '0.5rem' }}>&#x2714;</span>}
                      </label>
                    </li>
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

export default SavedPage;
