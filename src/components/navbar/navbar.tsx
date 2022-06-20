import React from 'react'
import './navbar.scss'

const Navbar = () => {
  return (
    <div>
      <div className='nav-container'>
        <div className='search'>
          <input type='text' placeholder='Search' />
          <i className='fas fa-search'></i>
        </div>
        <div className='contact'>
          <i className='far fa-envelope'></i>
          <i className='far fa-bell'></i>
          <div className='image-user'></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar