import React, { useState } from "react";

const Updateticket = () => {
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    return (
        <div className="update_ticket">
            <h1 className="header"> Cập nhật thông tin gói vé</h1>
            <label className="ticketname-label">Mã sự kiện</label>
            <input className="ticketname-input" placeholder="Mã sự kiện" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="ticketname-label">Tên sự kiện</label>
            <input className="ticketname-input" placeholder="Tên sự kiện" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="applicabledate-label">Ngày áp dụng</label>
            <input className="applicabledate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />
            <input className="applicabledate-time" type="time" onChange={(e: any) => { setApplicableDate(e.target.value) }} />

            <label className="duedate-label">Ngày hết hạn</label>
            <input className="duedate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />
            <input className="duedate-time" type="time" onChange={(e: any) => { setDueDate(e.target.value) }} />

            <label className="price-label">Giá vé áp dụng</label>
            <div className="singleticket">
                <input type="checkbox" checked />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="singleticket-input" type="number" />
                <label>/ vé</label>
            </div>
            <div className="comboticket">
                <input type="checkbox" checked />
                <label className="comboticket-label">Combo vé với giá</label>
                <input className="comboticket-input" type="number" />
                <label>/ vé</label>
            </div>

            <div>
                <label className="label-status">Tình trạng</label>
                <select className="status">
                    <option value={0}>Đang áp dụng</option>
                    <option value={1}>Chưa áp dụng</option>
                </select>
            </div>


            <div className="button-holder">
                <button className="huy">Hủy</button>
                <button className="luu">Lưu</button>
            </div>

        </div>
    );
}
export default Updateticket;