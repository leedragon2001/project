import React from 'react'
import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase"

interface Ticket {
    ticket: {
        stt: number,
        id: string,
        tensukien: string,
        sove: number,
        ngaysudung: Timestamp,
        ngayxuatve: Timestamp,
        tinhtrang: string,
        congcheckin: string
    }[]
}

const Ticketmanagement = () => {
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const usersCollectionRef = collection(db, "ticketlist");
    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);


    return (
        <div className="body-list">
            <h1 className="title">Ticket Management</h1>

            <input className="search" type="text" placeholder="Tìm bằng số vé" />
            <button className="locve">Lọc vé</button>
            <button className="csv">Xuất csv</button>

            <table className="body-table">
                <tr className="table-heading">
                    <th>STT</th>
                    <th>Booking code</th>
                    <th>Số vé</th>
                    <th>Tình trạng sử dụng</th>
                    <th>Ngày sử dụng</th>
                    <th>Ngày xuất vé</th>
                    <th>Cổng check-in</th>
                </tr>
                {tickets.map((ticket) =>
                    <tr className="table-content">
                        <td>{ticket.stt}</td>
                        <td>{ticket.id}</td>
                        <td>{ticket.sove}</td>
                        <td>{ticket.tensukien}</td>
                        <td>{ticket.tinhtrang}</td>
                        <td>{ticket.ngaysudung.toDate().toDateString()}</td>
                        <td>{ticket.ngayxuatve.toDate().toDateString()}</td>
                        <td>{ticket.congcheckin}</td>
                    </tr>
                )}
            </table>
        </div>
    );
}

export default Ticketmanagement