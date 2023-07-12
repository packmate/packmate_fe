import React from 'react';
import './savedPage.css'

class SavedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedLists: [],
      selectedList: null,
    };
  }

  componentDidMount() {
    // Simulating two trips
    const trip1 = {
      name: 'List 1',
      items: [
        { id: 1, name: 'Item A', packed: false, crossedOut: false },
        { id: 2, name: 'Item B', packed: false, crossedOut: false },
        { id: 3, name: 'Item C', packed: false, crossedOut: false },
      ],
    };

    const trip2 = {
      name: 'List 2',
      items: [
        { id: 4, name: 'Item X', packed: false, crossedOut: false },
        { id: 5, name: 'Item Y', packed: false, crossedOut: false },
        { id: 6, name: 'Item Z', packed: false, crossedOut: false },
      ],
    };

    this.setState({
      savedLists: [trip1, trip2],
    });
  }

  handleSaveList = (listName, listItems) => {
    this.setState((prevState) => ({
      savedLists: [...prevState.savedLists, { name: listName, items: listItems }],
    }));
  };


  handleListClick = (listName) => {
    if (this.state.selectedList && this.state.selectedList.name === listName) {
      this.setState({ selectedList: null });
    } else {
      const selectedList = this.state.savedLists.find((list) => list.name === listName);
      this.setState({ selectedList });
    }
  };

  handleItemToggle = (listName, itemId) => {
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
      const updatedSavedLists = [...savedLists];
      updatedSavedLists[selectedListIndex] = updatedList;

      return {
        savedLists: updatedSavedLists,
      };
    });
  };

  render() {
    const { savedLists, selectedList } = this.state;

    return (
      <div>
        {selectedList ? (
          <div>
            <h1 className="saved-header">{selectedList.name}</h1>
            <ul className="item-list">
              {selectedList.items.map((item) => (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox" className='checkbox'
                      checked={item.packed}
                      onChange={() => this.handleItemToggle(selectedList.name, item.id)}
                    />
                    {item.name}
                    {item.packed && <span className="check-mark">✅</span>}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="saved-header">My List</h1>
            {savedLists.length === 0 ? (
              <p className="no-list-message">No list Yet!</p>
            ) : (
              <div>
                <ul>
                  {savedLists.map((list, index) => (
                    <li key={index}>
                      <button className="list-name-buttons" onClick={() => this.handleListClick(list.name)}>
                        {list.name}
                      </button>
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