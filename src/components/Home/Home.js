import React from 'react'
import './Home.css'

const Home = ({ createList, onChange, value }) => {

  return (
    <div className='dropdown'>
      <select className='trip-dropdown' value={value} onChange={onChange}>
        <option value="" disabled selected>Select a Trip</option>
        <option value="Kayaking">Kayaking</option>
        <option value="Camping">Camping</option>
        <option value="Fishing">Fishing</option>
        <option value="Mountain Biking">Mountain Biking</option>
        <option value="Backpacking">Backpacking</option>
        <option value="Climbing">Climbing</option>
        <option value="Custom">Custom</option>
      </select>
      <button className='trip-submit' onClick={createList}>SUBMIT</button>
    </div>
  )
}

export default Home