import './header.scss'
import { Routes, Route } from 'react-router-dom';
import Slidebar from '../slidebar/slidebar';
import Navbar from '../navbar/navbar';

import Checkticket from '../../pages/check/checkticket';
import Home from '../../pages/home/home';
import Ticketmanagement from '../../pages/manage/ticketmanagement';
import Setting from '../../pages/service/setting';
import Createticket from '../../pages/service/createticket';
import Updateticket from '../../pages/service/updateticket';
import FilterTicket from '../../pages/manage/filterticket';

const Header = () => {
  return (
    <div className="header-container">
      <div className="body-left">
        <Slidebar />
      </div>
      <div className="body-right">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket-manage" element={<Ticketmanagement />} />
          <Route path="/check-tickets" element={<Checkticket />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
};

export default Header;