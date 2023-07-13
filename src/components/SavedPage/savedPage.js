// import React from 'react';
// import './savedPage.css'

// class SavedPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedList: null,
//       savedLists: props.savedLists,
//     };
//   }


//   handleListClick = (listName) => {
//     if (this.state.selectedList && this.state.selectedList.name === listName) {
//       this.setState({ selectedList: null });
//     } else {
//       const selectedList = this.state.savedLists.find((list) => list.name === listName);
//       this.setState({ selectedList });
//     }
//   };

//   handleItemToggle = (listName, itemId) => {
//     this.setState((prevState) => {
//       const { savedLists } = prevState;
//       const selectedListIndex = savedLists.findIndex((list) => list.name === listName);
//       const selectedList = savedLists[selectedListIndex];
//       const updatedItems = selectedList.items.map((item) => {
//         if (item.id === itemId) {
//           return { ...item, packed: !item.packed };
//         }
//         return item;
//       });
//       const updatedList = { ...selectedList, items: updatedItems };
//       const updatedSavedLists = [...savedLists];
//       updatedSavedLists[selectedListIndex] = updatedList;

//       return {
//         savedLists: updatedSavedLists,
//       };
//     });
//   };

//   render() {
//     const { savedLists } = this.state;
//     const { selectedList } = this.state;
//     const listName = selectedList ? selectedList.name : "My List";
  
//     let listItems = [];
//     if (selectedList && Array.isArray(selectedList.items)) {
//       listItems = selectedList.items;
//     }
  
//     return (
//       <div>
//         {selectedList ? (
//           <div>
//             <h1 className="saved-header">{listName}</h1>
//             <ul className="item-list">
//               {listItems.map((item) => (
//                 <li key={item.id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       className="checkbox"
//                       checked={item.packed}
//                       onChange={() =>
//                         this.handleItemToggle(selectedList.name, item.id)
//                       }
//                     />
//                     {item.name}
//                     {item.packed && <span className="check-mark">✅</span>}
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <div>
//             <h1 className="saved-header">My List</h1>
//             {savedLists.length === 0 ? (
//               <p className="no-list-message">No list yet!</p>
//             ) : (
//               <div>
//                 <ul>
//                   {savedLists.map((list, index) => (
//                     <li key={index}>
//                       <button
//                         className="list-name-buttons"
//                         onClick={() => this.handleListClick(list.name)}
//                       >
//                         {list.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default SavedPage;
import React from 'react';
import { Link } from 'react-router-dom';
import './savedPage.css';

class SavedPage extends React.Component {
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
    const { savedLists } = this.state;
    const { selectedList } = this.state;
    const listName = selectedList ? selectedList.name : "My List";
  
    let listItems = [];
    if (selectedList && Array.isArray(selectedList.items)) {
      listItems = selectedList.items;
    }
  
    return (
      <div>
        <Link to="/" className="home-button">Back to Home</Link>
        {selectedList ? (
          <div>
            <h1 className="saved-header">{listName}</h1>
            <ul className="item-list">
              {listItems.map((item) => (
                <li key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={item.packed}
                      onChange={() =>
                        this.handleItemToggle(selectedList.name, item.id)
                      }
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
              <p className="no-list-message">No list yet!</p>
            ) : (
              <div>
                <ul>
                  {savedLists.map((list, index) => (
                    <li key={index}>
                      <button
                        className="list-name-buttons"
                        onClick={() => this.handleListClick(list.name)}
                      >
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