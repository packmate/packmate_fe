import React, { useState } from 'react';
import './ListPage.css'
import { useHistory } from 'react-router-dom'
import './ListPage.css'

const ListPage = ({ packItems, selectedItems, handleCheckboxChange, handleNameChange, listName, handleSaveList }) => {
    const history = useHistory();
    const [customItem, setCustomItem] = useState('');
    const [customItems, setCustomItems] = useState([]);

    const handleButtonClick = () => {
//         const listNumber = 1;
        const listName = `List ${listNumber}`;
        handleSaveList(listName, selectedItems);
        history.push('/mylist');
      };

    return (
        <div className='list-page-container'>
            <div className='list-name-container'>
        history.push('/mylist');
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
                        <span className='item-name'>{item.name}</span>
                    </div>
                ))}
                {displayCustomItems()}
                <input type="text" value={customItem} onChange={(e) => setCustomItem(e.target.value)} placeholder="Enter custom item" />
                <button onClick={handleAddCustomItem}>Add Item</button>
                <button onClick={handleButtonClick} className='submit-list-button'>Submit</button>
            </div>
        </div>
    );
};

export default ListPage;