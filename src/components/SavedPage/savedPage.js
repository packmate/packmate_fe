import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './savedPage.css';

class SavedPage extends React.Component {
  static propTypes = {
    savedLists: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            packed: PropTypes.bool.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedList: null,
      savedLists: props.savedLists,
    };
  }

  handleListClick = (listName) => {
    if (this.state.selectedList && this.state.selectedList.name === listName) {
      this.setState({ selectedList: null });
    } else {
      const selectedList = this.state.savedLists.find((list) => list.name === listName);
      this.setState({ selectedList });
    }
  };

  handleItemToggle = (itemId) => {
    this.setState((prevState) => {
      const { selectedList } = prevState;
      const updatedItems = selectedList.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      const updatedList = { ...selectedList, items: updatedItems };
      return { selectedList: updatedList };
    });
  };

  handleAddCustomItem = (itemName) => {
    const { selectedList } = this.state;
    const customItem = {
      id: Math.random().toString(36).substring(7),
      name: itemName,
      packed: false,
    };

    this.setState((prevState) => {
      const updatedList = {
        ...selectedList,
        items: [...selectedList.items, customItem],
      };
      const updatedSavedLists = prevState.savedLists.map((list) => {
        if (list.name === selectedList.name) {
          return updatedList;
        }
        return list;
      });

      return {
        selectedList: updatedList,
        savedLists: updatedSavedLists,
      };
    });
  };

  render() {
    const { savedLists, selectedList } = this.state;
    const listName = selectedList ? selectedList.name : 'My List';
    const showBackButton = selectedList && selectedList.items && selectedList.items.length > 0;
    const allItemsChecked = selectedList && selectedList.items && selectedList.items.every((item) => item.packed);

    return (
      <div>
        {showBackButton ? (
          <div className="button-container">
            <Link to="/mylist" className="back-button">
              Back to Saved Lists
            </Link>
          </div>
        ) : (
          <div className="button-container">
            <Link to="/" className="home-button">
              Back to Home
            </Link>
          </div>
        )}
        {selectedList ? (
          <div>
            <h1 className="saved-header">{listName}</h1>
            <ul className="item-list">
              {selectedList.items.map((item) => (
                <li key={item.id}>
                  <label className={item.packed ? 'item-packed' : ''}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={item.packed}
                      onChange={() => this.handleItemToggle(item.id)}
                    />
                    <span className={item.packed ? 'item-crossed' : ''}>{item.name}</span>
                    {item.packed && <span className="check-mark"></span>}
                  </label>
                </li>
              ))}
              {allItemsChecked && (
                <li>
                  <p className="ready-message">You're ready for your trip!!</p>
                </li>
              )}
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="saved-header">My List</h1>
            {savedLists.length === 0 ? (
              <p className="no-list-message">No list yet!</p>
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
