import React, { useState } from "react";
import './createticket.scss'

const Createticket = () => {
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    return (
        <div className="create-ticket">
            <h1 className="create-header"> Tạo gói vé</h1>
            <label className="create-ticketname-label">Tên gói vé</label>
            <input className="create-ticketname-input" placeholder="Ticket name" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="create-applicabledate-label">Ngày áp dụng</label>
            <input className="create-applicabledate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />
            <input className="create-applicabledate-time" type="time" onChange={(e: any) => { setApplicableDate(e.target.value) }} />

            <label className="create-duedate-label">Ngày hết hạn</label>
            <input className="create-duedate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />
            <input className="create-duedate-time" type="time" onChange={(e: any) => { setDueDate(e.target.value) }} />

            <label className="create-price-label">Giá vé áp dụng</label>
            <div className="create-singleticket">
                <input type="checkbox" />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="create-singleticket-input" type="number" placeholder="Giá vé" />
                <label>/ vé</label>
            </div>
            <div className="create-comboticket">
                <input type="checkbox" />
                <label className="create-comboticket-label">Combo vé với giá</label>
                <input className="create-comboticket-input-giave" type="number" placeholder="Giá vé" />
                <label>/</label>
                <input className="create-comboticket-input-sove" type="number" placeholder="Số vé" />
                <label>vé</label>
            </div>

            <div>
                <label className="create-label-status">Tình trạng</label>
                <select className="create-status">
                    <option value={0}>Đang áp dụng</option>
                    <option value={1}>Chưa áp dụng</option>
                </select>
            </div>


            <div className="create-button-holder">
                <button className="create-huy">Hủy</button>
                <button className="create-luu">Lưu</button>
            </div>

        </div>
    );
}
export default Createticket;