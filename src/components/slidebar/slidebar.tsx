import React from 'react';
import './slidebar.scss';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

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
              <i className="fas fa-home"></i>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ticket-manage">
              <i className="fas fa-ticket-alt"></i>
              Ticket Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/check-tickets">
              <i className="fas fa-bars"></i>
              Check Ticket
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting/service">
              <i className="fas fa-cog"></i>
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