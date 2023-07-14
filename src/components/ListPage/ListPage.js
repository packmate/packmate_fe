import React, { useState } from "react";
import "./ListPage.css";
import { useHistory } from "react-router-dom";

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
        handleSaveList(listName, selectedItems);
        history.push("/mylist");
        resetState();
    };


    const handleAddCustomItem = () => {
        if (customItem.trim() !== "") {
            setCustomItems([...customItems, customItem.trim()]);
            setCustomItem("");
        }
    };

    const displayCustomItems = () => {
        return customItems.map((item, index) => (
            <div key={index}>
                <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                />
                <span>{item}</span>
            </div>
        ));
    };

    return (
        <div>
            <input
                type="text"
                value={listName}
                onChange={handleNameChange}
                placeholder="Enter List Name"
            />
            <div className="list-name-container">
                {packItems.map((item) => (
                    <div key={item.id}>
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        <span className="item-name">{item.name}</span>
                    </div>
                ))}
                {displayCustomItems()}
                <input
                    type="text"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder="Enter custom item"
                />
                <button onClick={handleAddCustomItem}>Add Item</button>
            </div>
            <button disabled={!formValid} onClick={handleButtonClick} className="submit-list-button">Submit</button>
            {!formValid && (
                <p className="invalid-form">Please fill out the list name and select at least one item!</p>)}
        </div>
    );
};

export default ListPage;
