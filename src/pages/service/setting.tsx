import React, { useEffect, useState } from 'react'

import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import './setting.scss'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import green from '../../assets/green.png'
import red from '../../assets/red.png'
import edit from '../../assets/edit.png'


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

const Setting = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<Ticket["ticket"]>([]);
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

    const applying = {
        border: "0.5px solid #03AC00",
        borderRadius: "6px",
        backgroundColor: "#DEF7E0",
        color: "#03AC00",
        width: "60%",
        height: "60%",
        padding: "3px",

        display: "flex",
        fontSize: "15px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
    };

    const off = {
        border: "0.5px solid #FD5959",
        borderRadius: "6px",
        backgroundColor: "#F8EBE8",
        color: "#FD5959",
        width: "50%",
        height: "60%",
        padding: "3px",

        display: "flex",
        fontSize: "15px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    }

    useEffect(() => {
        setResult([]);
        tickets.filter(value => {
            if (value.magoi.toString().includes(search)) {
                setResult(result => [...result, value])
            }
            else if (value.tengoive.toLowerCase().includes(search)) {
                setResult(result => [...result, value])
            }
            else if (value.giacombo.toString().includes(search)) {
                setResult(result => [...result, value])
            }
            else if (value.giave.toString().includes(search)) {
                setResult(result => [...result, value])
            }
        })

    }, [search])

    return (
        <div className="setting-container">
            <div className="setting-list">
                <h1 className="setting-title">Ticket List</h1>
                <input className="setting-search" type="text" placeholder="Tìm bằng số vé" onChange={(e) => setSearch(e.target.value)} />
                <button className="setting-add-ticket" onClick={() => handleCreate()}>Thêm gói vé</button>
                <button className="setting-csv">Xuất file(.csv)</button>
                <table className="setting-body-table">
                    <tr className="setting-table-heading">
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
                    { }
                    {!search &&
                        tickets.map((ticket) =>
                            <tr className="setting-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.magoi}</td>
                                <td>{ticket.tengoive}</td>
                                <td>{ticket.ngayapdung}</td>
                                <td>{ticket.ngayhethan}</td>
                                <td>{ticket.giave}</td>
                                <td>{ticket.giacombo}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrang === "Đang áp dụng" &&
                                        <Typography style={applying}><img src={green} alt={green} /> {ticket.tinhtrang}</Typography>}
                                    {ticket.tinhtrang === "Tắt" &&
                                        <Typography style={off}><img src={red} alt={red} /> {ticket.tinhtrang}</Typography>}
                                </td>
                                <td><button className='setting-button-update' onClick={() => handleUpdate()}><img src={edit} alt={edit} />Cập nhật</button></td>
                            </tr>
                        )}
                    {search &&
                        result.map((ticket) =>
                            <tr className="setting-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.magoi}</td>
                                <td>{ticket.tengoive}</td>
                                <td>{ticket.ngayapdung}</td>
                                <td>{ticket.ngayhethan}</td>
                                <td>{ticket.giave}</td>
                                <td>{ticket.giacombo}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrang === "Đang áp dụng" &&
                                        <Typography style={applying}><img src={green} alt={green} /> {ticket.tinhtrang}</Typography>}
                                    {ticket.tinhtrang === "Tắt" &&
                                        <Typography style={off}><img src={red} alt={red} /> {ticket.tinhtrang}</Typography>}
                                </td>
                                <td><button className='setting-button-update' onClick={() => handleUpdate()}><img src={edit} alt={edit} />Cập nhật</button></td>
                            </tr>
                        )
                    }





                </table>
            </div>
        </div>
    )
}

export default Setting