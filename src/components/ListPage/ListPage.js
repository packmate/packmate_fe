import React from 'react';

const ListPage = ({ packItems, selectedItems, fetchItems, handleCheckboxChange }) => {
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
            {packItems.map(makeList)}
        </div>
    )
};

export default ListPage;


