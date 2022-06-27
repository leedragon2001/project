import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Updateticket from './updateticket'
import Createticket from './createticket'
import { db } from "../../firebase"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import './service.scss'
import { useNavigate } from 'react-router-dom'
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

const Service = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const usersCollectionRef = collection(db, "servicelist");
    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);

    const handleCreate = () => {
        navigate(`createticket`)
    }
    const handleUpdate = () => {
        navigate(`updateticket`)
    }

    return (
        <div className="service-container">
            <h1 className="service-title">Ticket List</h1>
            <input className="service-search" type="text" placeholder="Tìm bằng số vé" />
            <button className="service-add-ticket" onClick={() => handleCreate()}>Thêm gói vé</button>
            <button className="service-csv">Xuất file(.csv)</button>
            <table className="service-body-table">
                <tr className="service-table-heading">
                    <th>STT</th>
                    <th>Mã gói</th>
                    <th>Tên gói vé</th>
                    <th>Ngày áp dụng</th>
                    <th>Ngày hết hạn</th>
                    <th>Giá vé (VNĐ/vé)</th>
                    <th>Giá Combo (VNĐ/Combo)</th>
                    <th>Tình trạng</th>
                    <th></th>
                </tr>
                {tickets.map((ticket) =>
                    <tr className="service-table-content">
                        <td>{ticket.stt}</td>
                        <td>{ticket.magoi}</td>
                        <td>{ticket.tengoive}</td>
                        <td>{ticket.ngayapdung}</td>
                        <td>{ticket.ngayhethan}</td>
                        <td>{ticket.giave}</td>
                        <td>{ticket.giacombo}</td>
                        <td>{ticket.tinhtrang}</td>
                        <button onClick={() => handleUpdate()}>Cập nhật</button>
                    </tr>
                )}
            </table>

        </div>
    )
}

export default Service