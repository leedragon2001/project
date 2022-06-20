import React from 'react'
import { render } from "@testing-library/react"



const Ticketmanagement = () => {
    return (
        <div className="body-list">
            <h1 className="title">Ticket Management</h1>

            <input className="search" type="text" placeholder="tìm bằng số vé" />
            <button className="locve">Lọc vé</button>
            <button className="csv">Xuất csv</button>

            <table className="boy-table">
                <tr className="table-heading">
                    <th>STT</th>
                    <th>Booking code</th>
                    <th>Số vé</th>
                    <th>Tình trạng sử dụng</th>
                    <th>Ngày sử dụng</th>
                    <th>Ngày xuất vé</th>
                    <th>Cổng check-in</th>
                </tr>
                <tr className="table-content">
                </tr>
            </table>
        </div>
    );
}

export default Ticketmanagement