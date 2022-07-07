import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Celendar from "../home/celendar";
import Time from "./time";
import './updateticket.scss'
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

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

const Updateticket = () => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const navigate = useNavigate();
    const [ticketCode, setTicketCode] = useState('');
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

    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);

    const UpdateTicket = () => {

    }

    return (
        <div className="update-ticket">
            <h1 className="update-header"> Cập nhật thông tin gói vé</h1>
            <label className="update-code-label">Mã sự kiện</label>
            <input className="update-code-input" placeholder="Mã sự kiện" required />

            <label className="update-ticketname-label">Tên sự kiện</label>
            <input className="update-ticketname-input" placeholder="Tên sự kiện" />

            <label className="update-applicabledate-label">Ngày áp dụng</label>
            <div className="update-applicabledate-input">
                <Celendar format="DD/MM/YY" />
            </div>
            <div className="update-applicabledate-time">
                <Time />
            </div>

            <label className="update-duedate-label">Ngày hết hạn</label>
            <div className="update-duedate-input">
                <Celendar format="DD/MM/YY" />
            </div>
            <div className="update-duedate-time">
                <Time />
            </div>

            <label className="update-price-label">Giá vé áp dụng</label>
            <div className="update-singleticket">
                <input type="checkbox" />
                <label>Vé lẻ (vnđ/vé) với giá</label>
                <input className="update-singleticket-input" placeholder="Giá vé" />
                <label>/ vé</label>
            </div>
            <div className="update-comboticket">
                <input type="checkbox" />
                <label className="update-comboticket-label">Combo vé với giá</label>
                <input className="update-comboticket-input-giave" placeholder="Giá vé" />
                <label>/</label>
                <input className="update-comboticket-input-sove" placeholder="Số vé" />
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
                <button className="update-cancle" onClick={() => navigate(-1)}>Hủy</button>
                <button className="update-save" onClick={UpdateTicket}>Lưu</button>
            </div>

        </div>
    );
}
export default Updateticket;