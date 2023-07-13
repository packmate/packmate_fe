import React from 'react';
import { useHistory } from 'react-router-dom'
import './ListPage.css'

const ListPage = ({ packItems, selectedItems, fetchItems, handleCheckboxChange, handleSaveList }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        const listNumber = 1;
        const listName = `List ${listNumber}`;
        handleSaveList(listName, selectedItems);
        history.push('/mylist');
      };

    return (
        <div className='list-page-container'>
            <div className='list-name-container'>
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
            </div>
            <button className='submit-list-button' onClick={handleButtonClick}>Submit</button>
        </div>
    );
};

export default ListPage;