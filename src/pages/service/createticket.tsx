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
        sove: number
    }[]
}

const Createticket = () => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [applicableTime, setApplicableTime] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [singlePrice, setSinglePrice] = useState(0);
    const [comboPrice, setComboPrice] = useState(0);
    const [numberTicket, setNumberTicket] = useState(0);
    const [status, setStatus] = useState('');
    const usersCollectionRef = collection(db, "servicelist");
    const navigate = useNavigate();

    const CreateTicket = async () => {
        await addDoc(usersCollectionRef, { magoi: "ALT20210501", tengoive: ticketName, giave: singlePrice, giacombo: comboPrice, ngayapdung: applicableDate, ngayhethan: dueDate, tinhtrang: status, sove: numberTicket })
    }

    return (
        <div className="create-ticket">
            <h1 className="create-header"> Tạo gói vé</h1>
            <label className="create-ticketname-label">Tên gói vé</label>
            <input className="create-ticketname-input" placeholder="Ticket name" onChange={(e: any) => { setTicketName(e.target.value) }} required />

            <label className="create-applicabledate-label">Ngày áp dụng</label>
            <input className="create-applicabledate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />
            <input className="create-applicabledate-time" type="time" onChange={(e: any) => { setApplicableTime(e.target.value) }} />
            <label className="create-duedate-label">Ngày hết hạn</label>
            <input className="create-duedate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />
            <input className="create-duedate-time" type="time" onChange={(e: any) => { setDueTime(e.target.value) }} />

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
                <input className="create-comboticket-input-sove" placeholder="Số vé" onChange={(e: any) => { setNumberTicket(e.target.value) }} />
                <label>vé</label>
            </div>

            <div>
                <label className="create-label-status">Tình trạng</label>
                <select className="create-status" defaultValue="Chưa áp dụng" onChange={(e: any) => { setStatus(e.target.value) }}>
                    <option value="Đang áp dụng" >Đang áp dụng</option>
                    <option value="Chưa áp dụng">Chưa áp dụng</option>
                </select>
            </div>


            <div className="create-button-holder">
                <button className="create-huy" onClick={() => navigate(-1)}>Hủy</button>
                <button className="create-luu" type="submit" onClick={CreateTicket} >Lưu</button>
            </div>

        </div>
    );
}
export default Createticket;