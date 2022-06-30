import './slidebar.scss';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import home from '../../assets/home.png'
import tickets from '../../assets/tickets.png'
import ticket from '../../assets/ticket.png'
import setting from '../../assets/setting.png'
const Slidebar = () => {
  return (
    <div className="slidebar-container">
      <div className="slidebar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="slidebar-body">
        <ul>
          <li>
            <NavLink to="/">
              <img className="icon" src={home} alt="home" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ticket-manage">
              <img className="icon" src={ticket} alt="ticket" />
              Ticket Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-tickets">
              <img className="icon" src={tickets} alt="tickets" />
              Check Ticket
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting">
              <img className="icon-setting" src={setting} alt="setting" />
              Setting
            </NavLink>
            <ul className="menu">
              <li>
                <Link to="/setting/service">Service</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;