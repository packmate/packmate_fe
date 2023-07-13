//     const makeList = packItems.map(item => {
//         return (
//             <div key={item.id}>
//                 <input
//                     type='checkbox'
//                     checked={selectedItems.includes(item.id)}
//                     onChange={(e) => handleCheckboxChange(item.id)}
//                 />
//                 <span>{item.name}</span>
//             </div>
//         )
//     })

//     
//     return (
//         <div>
//             <input type="text" value={listName} onChange={handleNameChange} placeholder="Enter List Name" />
//             {makeList}
//             <button onClick={handleButtonClick}>Submit</button>

//         </div>



import React from 'react';
import './ListPage.css'
import { useHistory } from 'react-router-dom'

const ListPage = ({ packItems, selectedItems, handleCheckboxChange, handleNameChange, listName }) => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/mylist');
    };

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
                <button onClick={handleButtonClick}>Submit</button>
            </div>

        </div>
    );
};

export default ListPage;