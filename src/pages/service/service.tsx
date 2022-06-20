import React from 'react'
import Updateticket from './updateticket'
import Createticket from './createticket'

const Service = () => {
    return (
        <div className="body-list">
            <h1 className="title">Ticket List</h1>

            <input className="search" type="text" placeholder="tìm bằng số vé" />
            <button className="csv">Xuất csv</button>
            <button className="themgoive">Thêm gói vé</button>

            <table className="boy-table">
                <tr className="table-heading">
                    <th>STT</th>
                    <th>Mã gói</th>
                    <th>Tên gói vé</th>
                    <th>Ngày áp dụng</th>
                    <th>Ngày hết hạn</th>
                    <th>Giá vé (VNĐ/Vé)</th>
                    <th>Giá Combo (VNĐ/Combo)</th>
                    <th>Tình trạng</th>
                </tr>
                <tr className="table-content">
                </tr>
            </table>
        </div>
    )
}

export default Service