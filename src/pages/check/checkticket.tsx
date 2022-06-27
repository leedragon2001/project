import React from 'react'
import "./checkticket.scss"
import { render } from "@testing-library/react"
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import { setDatasets } from 'react-chartjs-2/dist/utils';

interface Ticket {
    ticket: {
        stt: number,
        sove: string,
        tensukien: number,
        tenloaive: string,
        ngaysudung: string,
        congcheckin: string,
        tinhtrangve: string
    }[]
}

const Checkticket = () => {
    // const [data, setData] = useState({});
    // const [control, setControl] = useState('');
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const usersCollectionRef = collection(db, "checklist");
    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);


    return (
        <div className='checkticket-container'>
            <div className="checkticket-list">
                <h1 className="checkticket-title">Check Ticket</h1>

                <input className="checkticket-search" type="text" placeholder="Tìm bằng số vé" />
                <button className="checkticket-doisoat">Chốt đổi soát</button>

                {/* <div
                    className={
                        control && control === 'Chưa đối soát'
                            ? 'control'
                            : control === 'Đã đối soát'
                                ? 'export'
                                : ''
                    }
                >
                    {control && control === 'Chưa đối soát'
                        ? 'Chốt đối soát'
                        : control === 'Đã đối soát'
                            ? 'Xuất file (.csv)'
                            : ''}
                </div> */}


                <table className="checkticket-body-table">
                    <tr className="checkticket-table-heading">
                        <th>STT</th>
                        <th>Số vé</th>
                        <th>Tên sự kiện</th>
                        <th>Ngày sử dụng</th>
                        <th>Tên loại vé</th>
                        <th>Cổng check-in</th>
                        <th></th>
                    </tr>

                    {tickets.map((ticket) =>
                        <tr className="checkticket-table-content">
                            <td>{ticket.stt}</td>
                            <td>{ticket.sove}</td>
                            <td>{ticket.tensukien}</td>
                            <td>{ticket.ngaysudung}</td>
                            <td>{ticket.tenloaive}</td>
                            <td>{ticket.congcheckin}</td>
                            <td>{ticket.tinhtrangve}</td>
                        </tr>
                    )}

                </table>
            </div>

            <div className="checkticket-body-right">
                <h1 className="checkticket-filter-heading">Lọc vé</h1>
                <p className="checkticket-filter">Tình trạng đối soát</p>
                <div className="checkticket-filter-options">
                    <div className="checkticket-radio-row">
                        <input type="radio" id="tat-ca" name="fav_language" value="Tất cả" />
                        <label htmlFor="tat-ca">Tất cả</label>
                    </div>
                    <div className="checkticket-radio-row">
                        <input type="radio" id="da-doi-soat" name="fav_language" value="Đã đối soát" />
                        <label htmlFor="da-doi-soat">Đã đối soát</label>
                    </div>
                    <div className="checkticket-radio-row">
                        <input type="radio" id="chua-doi-soat" name="fav_language" value="Chưa đối soát" />
                        <label htmlFor="chua-doi-soat">Chưa đối soát</label>
                    </div>
                </div>
                <div>
                    <label className="checkticket-ticket-type-filter-label">Loại vé</label>
                    <p className="checkticket-ticket-type-filter-input">Vé cổng</p>
                </div>
                <div>
                    <label className="checkticket-fromdate-filter-label">Từ ngày</label>
                    <input className="checkticket-fromdate-filter-input" type="date" />
                </div>
                <div>
                    <label className="checkticket-todate-filter-label">Đến ngày</label>
                    <input className="checkticket-todate-filter-input" type="date" />
                </div>

                <div>
                    <button className="checkticket-filter-button">Lọc</button>
                </div>
            </div>
        </div>
    )
}

export default Checkticket