import React from 'react'
import LineChart from './linechart'
import PieChart1 from './piechart1';
import PieChart2 from './piechart2';
import './home.scss'
import Celendar from './celendar';


const Home = () => {
    return (
        <div className="home-container">
            <div className="home-title">
                <h1>Thống kê</h1>
            </div>
            <div className="home-body-content">
                <div className="home-body-title">
                    <span>Doanh thu</span>
                    <div className='home-celendar'>
                        <Celendar />
                    </div>

                </div>

                <div className="line-chart">
                    <LineChart />
                </div>

                <div className="total">
                    <span>Tổng doanh thu</span>
                    <div className="revenue">
                        <span>525.145.000 </span>đồng
                    </div>
                </div>

                <div className="pie-chart">
                    <Celendar />
                    <div className="piechart1">
                        <div>Gói gia đình</div>
                        <PieChart1 />
                    </div>
                    <div className="piechart2">
                        <div>Gói sự kiện</div>
                        <PieChart2 />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;