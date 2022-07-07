import React, { useState, useEffect } from "react";
import Celendar from "../home/celendar";
import './createticket.scss'
import Time from "./time";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


interface Ticket {
    ticket: {
        stt: number,
        magoi: string,
        tengoive: string,
        giave: string,
        ngayapdung: string,
        ngayhethan: string,
        tinhtrang: string,
        giacombo: string
    }[]
}

const Createticket = () => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [applicableTime, setApplicableTime] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [singlePrice, setSinglePrice] = useState('');
    const [comboPrice, setComboPrice] = useState('');
    const [numberTicket, setNumberTicket] = useState('');
    const [status, setStatus] = useState('');
    const usersCollectionRef = collection(db, "servicelist");
    const navigate = useNavigate();

    const CreateTicket = async () => {
        await addDoc(usersCollectionRef, { tengoive: ticketName, giave: singlePrice, giacombo: comboPrice, ngayapdung: applicableDate, ngayhethan: dueDate, tinhtrang: status })
    }

    return (
        <div className="create-ticket">
            <h1 className="create-header"> Tạo gói vé</h1>
            <label className="create-ticketname-label">Tên gói vé</label>
            <input className="create-ticketname-input" placeholder="Ticket name" onChange={(e: any) => { setTicketName(e.target.value) }} required />

            <label className="create-applicabledate-label">Ngày áp dụng</label>
            <div className="create-applicabledate-input" onChange={(e: any) => { setApplicableDate(e.target.value) }}>
                <Celendar format="DD/MM/YY" />
            </div>
            <div className="create-applicabledate-time" onChange={(e: any) => { setApplicableTime(e.target.value) }}>
                <Time />
            </div>

            <label className="create-duedate-label">Ngày hết hạn</label>
            <div className="create-duedate-input" onChange={(e: any) => { setDueDate(e.target.value) }}>
                <Celendar format="DD/MM/YY" />
            </div>
            <div className="create-duedate-time" onChange={(e: any) => { setDueTime(e.target.value) }}>
                <Time />
            </div>

            <label className="create-price-label">Giá vé áp dụng</label>
            <div className="create-singleticket">
                <input type="checkbox" />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="create-singleticket-input" placeholder="Giá vé" onChange={(e: any) => { setSinglePrice(e.target.value) }} />
                <label>/ vé</label>
            </div>
            <div className="create-comboticket">
                <input type="checkbox" />
                <label className="create-comboticket-label">Combo vé với giá</label>
                <input className="create-comboticket-input-giave" placeholder="Giá vé" onChange={(e: any) => { setComboPrice(e.target.value) }} />
                <label>/</label>
                <input className="create-comboticket-input-sove" placeholder="Số vé" />
                <label>vé</label>
            </div>

            <div>
                <label className="create-label-status">Tình trạng</label>
                <select className="create-status">
                    <option value={0} onChange={(e: any) => { setStatus(e.target.value) }}>Đang áp dụng</option>
                    <option value={1} onChange={(e: any) => { setStatus(e.target.value) }}>Chưa áp dụng</option>
                </select>
            </div>


            <div className="create-button-holder">
                <button className="create-huy" onClick={() => navigate(-1)}>Hủy</button>
                <button className="create-luu" onClick={CreateTicket}>Lưu</button>
            </div>

        </div>
    );
}
export default Createticket;