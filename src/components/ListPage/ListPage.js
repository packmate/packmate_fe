import React, { useState } from 'react';
import './ListPage.css'
import { useHistory } from 'react-router-dom'

const ListPage = ({ packItems, selectedItems, handleCheckboxChange, handleNameChange, listName, resetState }) => {
    const history = useHistory();
    const [customItem, setCustomItem] = useState('');
    const [customItems, setCustomItems] = useState([]);

    const handleButtonClick = () => {
        history.push('/mylist');
        resetState();
    };

    const handleAddCustomItem = () => {
        if (customItem.trim() !== '') {
            setCustomItems([...customItems, customItem.trim()]);
            setCustomItem('')
        }
    }

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
        ))
    }

    return (
        <div>
            <input type="text" value={listName} onChange={handleNameChange} placeholder="Enter List Name" />
            <div className='list-container'>
                {packItems.map(item => (
                    <div key={item.id}>
                        <input
                            type='checkbox'
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                        />
                        <span>{item.name}</span>
                    </div>
                ))}
                {displayCustomItems()}
                <input type="text" value={customItem} onChange={(e) => setCustomItem(e.target.value)} placeholder="Enter custom item" />
                <button onClick={handleAddCustomItem}>Add Item</button>
                <button onClick={handleButtonClick}>Submit</button>
            </div>
        </div>
    );
};

export default ListPage;