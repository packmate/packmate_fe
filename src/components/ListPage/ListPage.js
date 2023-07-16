import React, { useState } from "react";
import "./ListPage.css";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const ListPage = ({
    packItems,
    selectedItems,
    handleCheckboxChange,
    handleNameChange,
    listName,
    handleSaveList,
    resetState,
    formValid
}) => {
    const history = useHistory();
    const [customItem, setCustomItem] = useState("");
    const [customItems, setCustomItems] = useState([]);


    const handleButtonClick = () => {
<<<<<<< HEAD
        // const allItems = [...selectedItems, ...customItems]; // Combine packItems and customItems
=======
        const allItems = [...selectedItems, ...customItems];
        // console.log("All Items:", allItems);
>>>>>>> f9bae0412d3e9fa1c69c6c490346a5d6ddb39724
        handleSaveList(listName, selectedItems);
        history.push("/mylist");
        resetState();
    };

    const handleAddCustomItem = () => {
        if (customItem.trim() !== "") {
            const newItem = {
                id: Math.random().toString(36).substring(7),
                name: customItem.trim(),
                packed: false,
            };
            // console.log("customItems:", customItems);
            setCustomItems([...customItems, newItem]);
            setCustomItem("");
            handleCheckboxChange(newItem.id);
        }
    };

    // const displayCustomItems = () => {
    //     return customItems.map((item) => (
    //         <div key={item.id}>
    //             <label>
    //                 <input
    //                     type="checkbox"
    //                     checked={selectedItems.includes(item.id)}
    //                     onChange={() => handleCheckboxChange(item.id)}
    //                 />
    //                 <span>{item.name}</span>
    //             </label>
    //         </div>
    //     ));
    // };

    const allItems = [...packItems, ...customItems];

    return (
        <div>
            <input
                type="text"
                value={listName}
                onChange={handleNameChange}
                placeholder="Enter List Name"
                className="list-name-input"
            />
            <div className="list-name-container">
                {allItems.map((item) => (
                    <div key={item.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <span className="item-name">{item.name}</span>
                        </label>
                    </div>
                ))}
                <div>
                    <input
                        type="text"
                        value={customItem}
                        onChange={(e) => setCustomItem(e.target.value)}
                        placeholder="Enter custom item"
                        className="custom-item-input"
                    />
                    <button className="add-item" onClick={handleAddCustomItem}>
                        Add Item
                    </button>
                </div>
            </div>
            {!formValid && (
                <p className="invalid-form">
                    Please fill out the list name and select at least one item!
                </p>
            )}
            <button
                disabled={!formValid}
                onClick={handleButtonClick}
                className="submit-list-button"
            >
                Submit
            </button>
        </div>
    );
};

ListPage.propTypes = {
    packItems: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    listName: PropTypes.string.isRequired,
    handleSaveList: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    formValid: PropTypes.bool.isRequired,
};

export default ListPage;
