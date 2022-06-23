import React from 'react'
import './navbar.scss'
import avatar from '../../assets/avatar.png';
import bell from '../../assets/bell.png';
import mail from '../../assets/mail.png';
import search from '../../assets/search.png';

const Navbar = () => {
  return (
    <div>
      <div className='nav-container'>
        <div className='search'>
          <input type='text' placeholder='Search' />
          <img src={search} alt="search" />
        </div>
        <div className='contact'>
          <img src={mail} alt="avatar" />
          <img src={bell} alt="bell" />
          <img src={avatar} alt="mail" />
        </div>
      </div>
    </div>
  )
}

export default Navbar