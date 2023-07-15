import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Home = ({ createList, onChange, value }) => {
const isDisabled = !value

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
        <option value="Everything">Custom</option>
      </select>
      <button className='trip-submit' onClick={createList} disabled={isDisabled}>SUBMIT</button>
      <Link to='mylist' className='mylist-btn'>
        <button className='saved-lists-btn'>Saved Lists</button>
      </Link>
    </div>
  )
}

export default Home

Home.propTypes = {
  createList: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}
