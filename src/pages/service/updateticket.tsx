import React, { useState, useEffect } from "react";
import Celendar from "../home/celendar";
import Time from "./time";
import './updateticket.scss'
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Modal } from "antd";

interface Ticket {
    stt: number,
    magoi: string,
    tengoive: string,
    giave: number,
    ngayapdung: string,
    ngayhethan: string,
    tinhtrang: string,
    giacombo: number,
    sove: number
}


const Updateticket = (props: any) => {

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

    const handleCancel = () => {
        props.setOpenModalUpdate(false)
        window.location.reload();
    };
    console.log(props.ticketID)
    const UpdateTicket = async (id: string, tengoive: string, magoi: string, ngayapdung: string, ngayhethan: string, giave: number, giacombo: number, sove: number, tinhtrang: string) => {
        const ticketDoc = doc(db, "servicelist", id)
        const newFields = { tengoive: ticketName, magoi: ticketCode, ngayapdung: applicableDate, ngayhethan: dueDate, giave: singlePrice, giacombo: comboPrice, sove: numberTicket, tinhtrang: status }
        await updateDoc(ticketDoc, newFields);
        window.location.reload();
    }

    useEffect(() => {
        console.log(status)
    }, [status])


    return (
        <Modal
            centered
            closable={false}
            footer={null}
            visible={props.openModalUpdate}
            onCancel={handleCancel}
            width={758}
        >
            <div className="update-ticket">
                <h1 className="update-header"> Cập nhật thông tin gói vé</h1>
                <label className="update-code-label">Mã sự kiện</label>
                <input className="update-code-input" placeholder={props.magoi} onChange={(e: any) => { setTicketCode(e.target.value) }} required />

                <label className="update-ticketname-label">Tên sự kiện</label>
                <input className="update-ticketname-input" placeholder={props.tengoive} onChange={(e: any) => { setTicketName(e.target.value) }} />

                <label className="update-applicabledate-label">Ngày áp dụng</label>
                <div className="create-applicabledate-input">
                    <Celendar format='DD/MM/YYYY' startday={setApplicableDate} />
                </div>
                <div className="create-applicabledate-time">
                    <Time starttime={setApplicableTime} />
                </div>
                <label className="update-duedate-label">Ngày hết hạn</label>
                <div className="create-duedate-input">
                    <Celendar format='DD/MM/YYYY' endday={setDueDate} />
                </div>
                <div className="create-duedate-time">
                    <Time endtime={setDueTime} />
                </div>

                <label className="update-price-label">Giá vé áp dụng</label>
                <div className="update-singleticket">
                    <input type="checkbox" />
                    <label>Vé lẻ (vnđ/vé) với giá</label>
                    <input className="update-singleticket-input" placeholder={props.giave} onChange={(e: any) => { setSinglePrice(e.target.value) }} />
                    <label>/ vé</label>
                </div>
                <div className="update-comboticket">
                    <input type="checkbox" />
                    <label className="update-comboticket-label">Combo vé với giá</label>
                    <input className="update-comboticket-input-giave" placeholder={props.giacombo} onChange={(e: any) => { setComboPrice(e.target.value) }} />
                    <label>/</label>
                    <input className="update-comboticket-input-sove" placeholder={props.sove} onChange={(e: any) => { setNumberTicket(e.target.value) }} />
                    <label>vé</label>
                </div>

                <div>
                    <label className="update-label-status">Tình trạng</label>
                    <select className="update-status" defaultValue={props.tinhtrang} onChange={(e: any) => { setStatus(e.target.value) }}>
                        <option value="Đang áp dụng" >Đang áp dụng</option>
                        <option value="Tắt">Tắt</option>
                    </select>
                </div>


                <div className="update-button-holder">
                    <button className="update-cancle" onClick={handleCancel}>Hủy</button>
                    <button className="update-save"
                        onClick={() => UpdateTicket(props.ticketID, ticketName, ticketCode, applicableDate, dueDate, singlePrice, comboPrice, numberTicket, status).then(props.setOpenModalUpdate(false))}
                    >Lưu</button>
                </div>

            </div>
        </Modal>
    );
}
export default Updateticket;