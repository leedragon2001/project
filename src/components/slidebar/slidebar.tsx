import React from 'react';
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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ticket-manage">
              Ticket Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-tickets">
              Check Ticket
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting/service">
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