import './navbar.scss'
import avatar from '../../assets/avatar.png';
import bell from '../../assets/bell.png';
import mail from '../../assets/mail.png';
import search from '../../assets/search.png';
import { Dropdown, Menu, Space } from 'antd';

const Navbar = () => {
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a href='#'>
              Logout
            </a>
          ),
        },

      ]}
    />
  );

  return (
    <div>
      <div className='nav-container'>
        <div className='search-top'>
          <input type='text' placeholder='Search' />
          <img src={search} alt="search" />
        </div>
        <div className='contact'>
          <img src={mail} alt="avatar" />
          <img src={bell} alt="bell" />
          <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()}>
              <img className="ava" src={avatar} alt="mail" width="50" height="32" />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Navbar