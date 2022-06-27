import React, { useState } from "react";
import './updateticket.scss'

const Updateticket = () => {
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    return (
        <div className="update-ticket">
            <h1 className="update-header"> Cập nhật thông tin gói vé</h1>
            <label className="update-code-label">Mã sự kiện</label>
            <input className="update-code-input" placeholder="Mã sự kiện" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="update-ticketname-label">Tên sự kiện</label>
            <input className="update-ticketname-input" placeholder="Tên sự kiện" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="update-applicabledate-label">Ngày áp dụng</label>
            <input className="update-applicabledate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />
            <input className="update-applicabledate-time" type="time" onChange={(e: any) => { setApplicableDate(e.target.value) }} />

            <label className="update-duedate-label">Ngày hết hạn</label>
            <input className="update-duedate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />
            <input className="update-duedate-time" type="time" onChange={(e: any) => { setDueDate(e.target.value) }} />

            <label className="update-price-label">Giá vé áp dụng</label>
            <div className="update-singleticket">
                <input type="checkbox" />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="update-singleticket-input" type="number" placeholder="Giá vé" />
                <label>/ vé</label>
            </div>
            <div className="update-comboticket">
                <input type="checkbox" />
                <label className="update-comboticket-label">Combo vé với giá</label>
                <input className="update-comboticket-input-giave" type="number" placeholder="Giá vé" />
                <label>/</label>
                <input className="update-comboticket-input-sove" type="number" placeholder="Số vé" />
                <label>vé</label>
            </div>

            <div>
                <label className="update-label-status">Tình trạng</label>
                <select className="update-status">
                    <option value={0}>Đang áp dụng</option>
                    <option value={1}>Chưa áp dụng</option>
                </select>
            </div>


            <div className="update-button-holder">
                <button className="huy">Hủy</button>
                <button className="luu">Lưu</button>
            </div>

        </div>
    );
}
export default Updateticket;