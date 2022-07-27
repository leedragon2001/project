import React, { useEffect, useState } from 'react'
import { db } from "../../firebase"
import { collection, getDocs } from "firebase/firestore";
import './setting.scss'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import green from '../../assets/green.png'
import red from '../../assets/red.png'
import edit from '../../assets/edit.png'
import { Pagination } from '@mui/material';
import { CSVLink } from 'react-csv'
import Paginate from '../pagination';
import Updateticket from './updateticket'
import Createticket from './createticket'
import next from '../../assets/next.png'
import back from '../../assets/back.png'


interface Ticket {
    ticket: {
        id: string,
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

const Setting = () => {
    const navigate = useNavigate();
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [search, setSearch] = useState("");
    const [filterResult, setFilterResult] = useState<Ticket["ticket"]>([]);
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const [ticketID, setTicketID] = useState()
    const [propsTicketCode, setPropTicketCode] = useState()
    const [propsTicketName, setPropTicketName] = useState()
    const [propsTicketSinglePrice, setPropTicketSinglePrice] = useState()
    const [propsTicketComboPrice, setPropTicketComboPrice] = useState()
    const [propsTicketStatus, setPropTicketStatus] = useState()
    const [propsNumberTicket, setPropNumberTicket] = useState()
    const [propsTicketApplicableDate, setPropTicketApplicableDate] = useState()
    const [propsTicketDueDate, setPropTicketDueDate] = useState()

    const [currentPage, setCurrentPage] = useState(1);
    const Pagination = ((pageNumber: any) => setCurrentPage(pageNumber));
    const btnBack = ((pageNumber: any) => { if (currentPage > 1) { setCurrentPage(currentPage - 1) } });
    const btnNext = ((pageNumber: any) => { if (currentPage < pageNumbers.length) { setCurrentPage(currentPage + 1) } });
    const [PerPage] = useState(10);
    const pageNumbers = [];

    const indexOfLastPost = currentPage * PerPage;
    const indexOfFirstPost = indexOfLastPost - PerPage;
    const currentTickets = tickets.slice(indexOfFirstPost, indexOfLastPost);
    for (let i = 1; i <= Math.ceil(tickets.length / PerPage); i++) {
        pageNumbers.push(i);
    }


    const usersCollectionRef = collection(db, "servicelist");
    useEffect(() => {

        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))))
        };

        getTickets();
    }, []);



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
        width: "40%",
        height: "60%",
        padding: "3px",

        display: "flex",
        fontSize: "15px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px"
    }

    useEffect(() => {
        setFilterResult(tickets);
    }, [tickets]);

    useEffect(() => {
        if (search === "") setFilterResult(tickets);
        setFilterResult((prev) =>
            prev.filter((e) => e.magoi.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

    const header = [
        { label: 'STT', key: 'stt' },
        { label: ' Mã gói', key: 'magoi' },
        { label: ' Tên gói vé', key: 'tengoive' },
        { label: 'Ngày áp dụng', key: 'ngayapdung' },
        { label: 'Ngày hết hạn', key: 'ngayhethan' },
        { label: 'Giá vé (VNĐ/vé)', key: 'giave' },
        { label: 'Giá Combo (VNĐ/Combo)', key: 'giacombo' },
        { label: 'Tình trạng', key: 'tinhtrang' }

    ]

    const csvReport = {
        filename: "Files.csv",
        headers: header,
        data: tickets
    }
    const FilterUpdate = (ticketID: any, code: any, name: any, start: any, end: any, sprice: any, cprice: any, num: any, sta: any,) => {
        setOpenModalUpdate(true);
        console.log(ticketID)
        setTicketID(ticketID)
        setPropTicketCode(code)
        setPropTicketName(name)
        setPropTicketApplicableDate(start)
        setPropTicketDueDate(end)
        setPropTicketSinglePrice(sprice)
        setPropTicketComboPrice(cprice)
        setPropNumberTicket(num)
        setPropTicketStatus(sta)
    }
    const FilterCreate = () => {
        setOpenModalCreate(true);
    }

    return (
        <div className="setting-container">
            <div className="setting-list">
                <h1 className="setting-title">Ticket List</h1>
                <input className="setting-search" type="text" placeholder="Tìm bằng số vé" onChange={(e) => setSearch(e.target.value)} />
                <button className="setting-add-ticket" onClick={FilterCreate}>Thêm gói vé</button>
                <Createticket
                    openModalCreate={openModalCreate}
                    setOpenModalCreate={setOpenModalCreate} />

                <CSVLink className="setting-csv" type="button" {...csvReport}>
                    Xuất file(.csv)
                </CSVLink>
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

                    {filterResult.map((ticket) =>
                        <tr className="setting-table-content" key={ticket.id}>
                            <td>{ticket.stt}</td>
                            <td>{ticket.magoi}</td>
                            <td>{ticket.tengoive}</td>
                            <td>{ticket.ngayapdung}</td>
                            <td>{ticket.ngayhethan}</td>
                            <td>{ticket.giave} VNĐ</td>
                            <td>{ticket.giacombo} VNĐ / {ticket.sove} vé</td>
                            <td className='setting-tinhtrang'>
                                {ticket.tinhtrang.includes("Đang áp dụng") &&
                                    <Typography style={applying}><img src={green} alt={green} /> {ticket.tinhtrang}</Typography>}
                                {ticket.tinhtrang.includes("Tắt") &&
                                    <Typography style={off}><img src={red} alt={red} /> {ticket.tinhtrang}</Typography>}
                            </td>
                            <td><button className='setting-button-update' onClick={() => { FilterUpdate(ticket.id, ticket.magoi, ticket.tengoive, ticket.ngayapdung, ticket.ngayhethan, ticket.giave, ticket.giacombo, ticket.sove, ticket.tinhtrang,) }}><img src={edit} alt={edit} />Cập nhật</button></td>

                        </tr>
                    )}
                    <Updateticket
                        openModalUpdate={openModalUpdate}
                        setOpenModalUpdate={setOpenModalUpdate}
                        ticketID={ticketID}
                        magoi={propsTicketCode}
                        tengoive={propsTicketName}
                        ngayapdung={propsTicketApplicableDate}
                        ngayhethan={propsTicketDueDate}
                        giave={propsTicketSinglePrice}
                        giacombo={propsTicketComboPrice}
                        sove={propsNumberTicket}
                        tinhtrang={propsTicketStatus}
                    />

                </table>
                <div className='pagination'>

                    {pageNumbers.map(number => (
                        <div>
                            <button className="back-setting" onClick={() => btnBack(number)}>
                                <img src={back} alt="back" />
                            </button>

                            <div key={number} className='items-page-setting' onClick={() => Pagination(number)} >
                                <a className='links-page-setting'>
                                    {number}
                                </a>
                            </div>

                            <button className="next-setting" onClick={() => btnNext(number)}>
                                <img src={next} alt="next" />
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Setting