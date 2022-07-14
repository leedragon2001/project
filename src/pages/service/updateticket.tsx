import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Celendar from "../home/celendar";
import Time from "./time";
import './updateticket.scss'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

interface Ticket {

    stt: number,
    magoi: string,
    tengoive: string,
    giave: string,
    ngayapdung: string,
    ngayhethan: string,
    tinhtrang: string,
    giacombo: string,
    sove: number

}


const Updateticket = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const navigate = useNavigate();
    const [ticketCode, setTicketCode] = useState('');
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

    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);

    const UpdateTicket = async () => {
        const ticketDoc = doc(db, "servicelist")
        const newFields = { tengoive: ticketName, magoi: ticketCode, ngayapdung: applicableDate, ngayhethan: dueDate, giave: singlePrice, giacombo: comboPrice, sove: numberTicket, tinhtrang: status }
        await updateDoc(ticketDoc, newFields);
    }

    return (
        <div className="update-ticket">
            <h1 className="update-header"> Cập nhật thông tin gói vé</h1>
            <label className="update-code-label">Mã sự kiện</label>
            <input className="update-code-input" placeholder="Mã sự kiện" onChange={(e: any) => { setTicketCode(e.target.value) }} required />

            <label className="update-ticketname-label">Tên sự kiện</label>
            <input className="update-ticketname-input" placeholder="Tên sự kiện" onChange={(e: any) => { setTicketName(e.target.value) }} />

            <label className="update-applicabledate-label">Ngày áp dụng</label>
            <input className="create-applicabledate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />
            <input className="create-applicabledate-time" type="time" onChange={(e: any) => { setApplicableTime(e.target.value) }} />
            <label className="update-duedate-label">Ngày hết hạn</label>
            <input className="create-duedate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />
            <input className="create-duedate-time" type="time" onChange={(e: any) => { setDueTime(e.target.value) }} />

            <label className="update-price-label">Giá vé áp dụng</label>
            <div className="update-singleticket">
                <input type="checkbox" />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="update-singleticket-input" placeholder="Giá vé" onChange={(e: any) => { setSinglePrice(e.target.value) }} />
                <label>/ vé</label>
            </div>
            <div className="update-comboticket">
                <input type="checkbox" />
                <label className="update-comboticket-label">Combo vé với giá</label>
                <input className="update-comboticket-input-giave" placeholder="Giá vé" onChange={(e: any) => { setComboPrice(e.target.value) }} />
                <label>/</label>
                <input className="update-comboticket-input-sove" placeholder="Số vé" onChange={(e: any) => { setNumberTicket(e.target.value) }} />
                <label>vé</label>
            </div>

            <div>
                <label className="update-label-status">Tình trạng</label>
                <select className="update-status" defaultValue="Chưa áp dụng" onChange={(e: any) => { setStatus(e.target.value) }}>
                    <option value="Đang áp dụng" >Đang áp dụng</option>
                    <option value="Chưa áp dụng">Chưa áp dụng</option>
                </select>
            </div>


            <div className="update-button-holder">
                <button className="update-cancle" onClick={() => navigate(-1)}>Hủy</button>
                <button className="update-save" onClick={() => UpdateTicket()}>Lưu</button>
            </div>

        </div>
    );
}
export default Updateticket;