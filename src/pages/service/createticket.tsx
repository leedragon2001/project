import React, { useState, useEffect } from "react";
import Celendar from "../home/celendar";
import './createticket.scss'
import Time from "./time";
import { db } from "../../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

import { Modal } from "antd";


interface Ticket {
    ticket: {
        stt: number,
        magoi: string,
        tengoive: string,
        giave: number,
        ngayapdung: string,
        ngayhethan: string,
        tinhtrang: string,
        giacombo: number,
        sove: number
    }[]
}

const Createticket = (props: any) => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const [ticketName, setTicketName] = useState('');
    const [applicableDate, setApplicableDate] = useState('');
    const [applicableTime, setApplicableTime] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [singlePrice, setSinglePrice] = useState(0);
    const [comboPrice, setComboPrice] = useState(0);
    const [numberTicket, setNumberTicket] = useState(0);
    const [status, setStatus] = useState('Tắt');
    const usersCollectionRef = collection(db, "servicelist");
    const handleCancel = () => { props.setOpenModalCreate(false) };

    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);


    const CreateTicket = async () => {
        await addDoc(usersCollectionRef, { stt: tickets.length + 1, magoi: "ALT20210501", tengoive: ticketName, giave: singlePrice, giacombo: comboPrice, ngayapdung: applicableDate, ngayhethan: dueDate, tinhtrang: status, sove: numberTicket })
        props.setOpenModalCreate(false);
        window.location.reload();
    }


    return (
        <Modal
            centered
            closable={false}
            footer={null}
            visible={props.openModalCreate}
            onCancel={handleCancel}
            width={758}
        >
            <div className="create-ticket">
                <h1 className="create-header"> Tạo gói vé</h1>
                <label className="create-ticketname-label">Tên gói vé</label>
                <input className="create-ticketname-input" placeholder="Ticket name" onChange={(e: any) => { setTicketName(e.target.value) }} required />

                <label className="create-applicabledate-label">Ngày áp dụng</label>
                <div className="create-applicabledate-input">
                    <Celendar format='DD/MM/YYYY' startday={setApplicableDate} />
                </div>
                <div className="create-applicabledate-time">
                    <Time starttime={setApplicableTime} />
                </div>
                <label className="create-duedate-label">Ngày hết hạn</label>
                <div className="create-duedate-input">
                    <Celendar format='DD/MM/YYYY' endday={setDueDate} />
                </div>
                <div className="create-duedate-time">
                    <Time endtime={setDueTime} />
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
                    <input className="create-comboticket-input-sove" placeholder="Số vé" onChange={(e: any) => { setNumberTicket(e.target.value) }} />
                    <label>vé</label>
                </div>

                <div>
                    <label className="create-label-status">Tình trạng</label>
                    <select className="create-status" defaultValue="Tắt" onChange={(e: any) => { setStatus(e.target.value) }}>
                        <option value="Đang áp dụng" >Đang áp dụng</option>
                        <option value="Tắt">Tắt</option>
                    </select>
                </div>


                <div className="create-button-holder">
                    <button className="create-huy" onClick={handleCancel}>Hủy</button>
                    <button className="create-luu" type="submit" onClick={CreateTicket}  >Lưu</button>
                </div>

            </div>
        </Modal>
    );
}
export default Createticket;