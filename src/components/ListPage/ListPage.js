import React from 'react';

const ListPage = ({ items, selectedItems, fetchItems, handleCheckboxChange }) => {
    const makeList = (item) => {
        return (
            <div key={item.id}>
                <input
                    type='checkbox'
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleCheckboxChange(item.id)}
                />
                <span>{item.name}</span>
            </div>
        )
    }

    return (
        <div>
            {items.map(makeList)}
        </div>
    )
};

export default ListPage;


//