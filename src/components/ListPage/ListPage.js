import React from 'react';
import { useHistory } from 'react-router-dom'

const ListPage = ({ packItems, selectedItems, fetchItems, handleCheckboxChange }) => {

    const history = useHistory();

    const makeList = packItems.map(item => {

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
    })

    const handleButtonClick = () => {
        history.push('/mylist');
    };

    return (
        <div>

            {makeList}
            <button onClick={handleButtonClick}>Submit</button>

        </div>
    )
};

export default ListPage;


