import React from 'react'
import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import "./ticketmanagement.scss"
import search from '../../assets/search.png';
import { useNavigate } from "react-router-dom";

interface Ticket {
    ticket: {
        stt: number,
        id: string,
        tensukien: string,
        sove: number,
        ngaysudung: string,
        ngayxuatve: string,
        tinhtrangsudung: string,
        congcheckin: string
    }[]
}

const Ticketmanagement = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const usersCollectionRef = collection(db, "ticketlist");
    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);

    const FilterBoard = () => {
        navigate(`filterticket`)
    }



    return (
        <div className="ticketmanagement-list">
            <h1 className="ticketmanagement-title">Ticket Management</h1>
            <input className="ticketmanagement-search" type="text" placeholder="Tìm bằng số vé" />

            <button className="ticketmanagement-locve" onClick={() => FilterBoard()} >Lọc vé</button>
            <button className="ticketmanagement-csv">Xuất file(.csv)</button>

            <table className="ticketmanagement-body-table">
                <tr className="ticketmanagement-table-heading">
                    <th>STT</th>
                    <th>Booking code</th>
                    <th>Số vé</th>
                    <th>Tên sự kiện</th>
                    <th>Tình trạng sử dụng</th>
                    <th>Ngày sử dụng</th>
                    <th>Ngày xuất vé</th>
                    <th>Cổng check-in</th>
                </tr>
                {tickets.map((ticket) =>
                    <tr className="ticketmanagement-table-content">
                        <td>{ticket.stt}</td>
                        <td>{ticket.id}</td>
                        <td>{ticket.sove}</td>
                        <td>{ticket.tensukien}</td>
                        <td>{ticket.tinhtrangsudung}</td>
                        <td>{ticket.ngaysudung}</td>
                        <td>{ticket.ngayxuatve}</td>
                        <td>{ticket.congcheckin}</td>
                    </tr>
                )}
            </table>
        </div>
    );
}

export default Ticketmanagement