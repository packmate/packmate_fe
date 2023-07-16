import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './savedPage.css';

const SavedPage = ({ savedLists }) => {
  const [selectedList, setSelectedList] = useState(null);

  const handleListClick = (listName) => {
    if (selectedList && selectedList.name === listName) {
      setSelectedList(null);
    } else {
<<<<<<< HEAD
      const selectedList = this.state.savedLists.find((list) => list.name === listName);
      this.setState({ selectedList });
=======
      const selectedList = savedLists.find((list) => list.name === listName);
      setSelectedList(selectedList);
>>>>>>> f9bae0412d3e9fa1c69c6c490346a5d6ddb39724
    }
  };

  const handleItemToggle = (itemId) => {
    setSelectedList((prevList) => {
      const updatedItems = prevList.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, packed: !item.packed };
        }
        return item;
      });
      const updatedList = { ...prevList, items: updatedItems };
      return updatedList;
    });
  };

  const handleAddCustomItem = (itemName) => {
    const customItem = {
      id: Math.random().toString(36).substring(7),
      name: itemName,
      packed: false,
    };

    setSelectedList((prevList) => {
      const updatedList = {
        ...prevList,
        items: [...prevList.items, customItem],
      };
      const updatedSavedLists = savedLists.map((list) => {
        if (list.name === prevList.name) {
          return updatedList;
        }
        return list;
      });

      return {
        ...updatedList,
        savedLists: updatedSavedLists,
      };
    });
  };

  const listName = selectedList ? selectedList.name : 'My List';
  const showBackButton = selectedList && selectedList.items && selectedList.items.length > 0;
  const allItemsChecked = selectedList && selectedList.items && selectedList.items.every((item) => item.packed);
  let customNum = 1;

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
                    onChange={() => handleItemToggle(item.id)}
                  />
                  <span className={item.packed ? 'item-crossed' : ''}>
                    {item.name ? item.name : `Custom Item ${customNum++}`}
                  </span>
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
                    <button className="list-name-buttons" onClick={() => handleListClick(list.name)}>
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
};

SavedPage.propTypes = {
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

export default SavedPage;
