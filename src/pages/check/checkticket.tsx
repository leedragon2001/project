import React from 'react'

const Checkticket = () => {
    return (
        <div className="body-list">
            <h1 className="title">Check Ticket</h1>

            <input className="search" type="text" placeholder="tìm bằng số vé" />
            <button className="csv">Chốt đổi soát</button>

            <table className="boy-table">
                <tr className="table-heading">
                    <th>STT</th>
                    <th>Booking code</th>
                    <th>Số vé</th>
                    <th>Ngày sử dụng</th>
                    <th>Tên loại vé</th>
                    <th>Cổng check-in</th>
                </tr>
                <tr className="table-content">
                </tr>
            </table>
        </div>
    )
}

export default Checkticket