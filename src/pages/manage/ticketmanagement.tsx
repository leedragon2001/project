
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase"
import "./ticketmanagement.scss"
import filter from '../../assets/filter.png'
import { useNavigate } from "react-router-dom";
import green from '../../assets/green.png'
import red from '../../assets/red.png'
import blue from '../../assets/blue.png'
import { Typography } from '@material-ui/core';
import FilterTicket from "./filterticket";
import more from '../../assets/more.png';
import ChangeTicket from './changeticket';
import Paginate from "../pagination";
import { CSVLink } from 'react-csv'
import next from '../../assets/next.png'
import back from '../../assets/back.png'

interface Ticket {
    key: string,
    stt: number,
    id: string,
    tensukien: string,
    sove: number,
    ngaysudung: string,
    ngayxuatve: string,
    tinhtrangsudung: string,
    congcheckin: string

}

const Ticketmanagement = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [filterResult, setFilterResult] = useState<Ticket[]>([]);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filterState, setFilterState] = useState<Ticket[]>([])
    const [propTicketCode, setPropTicketCode] = useState()
    const [propTicketNumber, setPropTicketNumber] = useState()
    const [propTicketName, setPropTicketName] = useState()
    const [propsTicketDueDate, setPropTicketDueDate] = useState()
    const [keyID, setKeyID] = useState<number>(0)

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


    const usersCollectionRef = collection(db, "ticketlist");
    useEffect(() => {
        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);


    useEffect(() => {
        setFilterResult(tickets);
    }, [tickets]);

    useEffect(() => {
        if (search === "") setFilterResult(tickets);
        setFilterResult((prev) =>
            prev.filter((e) => e.id.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

    const Applied = {
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

    const Over = {
        border: "0.5px solid #FD5959",
        borderRadius: "6px",
        backgroundColor: "#F8EBE8",
        color: "#FD5959",
        width: "60%",
        height: "60%",
        padding: "3px",

        display: "flex",
        fontSize: "15px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
    };

    const NotApply = {
        border: "0.5px solid #919DBA",
        borderRadius: "6px",
        backgroundColor: "#EAF1F8",
        color: "#919DBA",
        width: "60%",
        height: "60%",
        padding: "3px",

        display: "flex",
        fontSize: "15px",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
    };

    const Filter = () => {
        setOpenModal(true);
    }

    const Change = (key: any, id: any, num1: any, name1: any, duetime: any) => {
        setShowModal(true);
        setKeyID(key)
        setPropTicketName(name1)
        setPropTicketCode(id)
        setPropTicketNumber(num1)
        setPropTicketDueDate(duetime)
    }

    const header = [
        { label: 'STT', key: 'stt' },
        { label: 'Booking code', key: 'id' },
        { label: 'Số vé', key: 'sove' },
        { label: 'Tên sự kiện', key: 'tensukien' },
        { label: 'Tình trạng sử dụng', key: 'tinhtrangsudung' },
        { label: 'Ngày sử dụng', key: 'ngaysudung' },
        { label: 'Ngày xuất vé', key: 'ngayxuatve' },
        { label: 'Cổng check-in', key: 'congcheckin' }
    ]

    const csvReport = {
        filename: "File.csv",
        headers: header,
        data: tickets
    }

    useEffect(() => {
        setFilterResult(filterState);
        setTickets([])
        // console.log(filterState)
    }, [filterState])

    return (
        <div className='ticketmanagement-container'>
            <div className="ticketmanagement-list">
                <h1 className="ticketmanagement-title">Ticket Management</h1>
                <input className="ticketmanagement-search" type="text" placeholder="Tìm bằng số vé" onChange={(e) => setSearch(e.target.value)} />

                <button className="ticketmanagement-locve" onClick={Filter}>
                    <img src={filter} alt={filter} />
                    Lọc vé</button>

                <FilterTicket
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    setParent={setFilterState}
                />
                {/* <button className="ticketmanagement-csv">Xuất file(.csv)</button> */}
                <CSVLink className="ticketmanagement-csv" type="button" {...csvReport}>
                    Xuất file(.csv)
                </CSVLink>

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
                        <th></th>
                    </tr>
                    {!filterState && search &&
                        currentTickets.map((ticket) =>
                            <tr className="ticketmanagement-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.id}</td>
                                <td>{ticket.sove}</td>
                                <td>{ticket.tensukien}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrangsudung === "Chưa sử dụng" &&
                                        <Typography style={Applied}><img src={green} alt={green} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Đã sử dụng" &&
                                        <Typography style={NotApply}><img src={blue} alt={blue} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Hết hạn" &&
                                        <Typography style={Over}><img src={red} alt={red} /> {ticket.tinhtrangsudung}</Typography>}
                                </td>
                                <td>{ticket.ngaysudung}</td>
                                <td>{ticket.ngayxuatve}</td>
                                <td>{ticket.congcheckin}</td>
                                <td> <button className="button-more" onClick={() => { Change(ticket.key, ticket.id, ticket.sove, ticket.tensukien, ticket.ngayxuatve) }}><img src={more} alt={more} /></button></td>
                                <ChangeTicket
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    ticketID={keyID}
                                    id={propTicketCode}
                                    sove={propTicketNumber}
                                    tensukien={propTicketName}
                                    ngayhethan={propsTicketDueDate}
                                />
                            </tr>
                        )}
                    {filterState && !search &&
                        filterState.map((ticket) =>
                            <tr className="ticketmanagement-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.id}</td>
                                <td>{ticket.sove}</td>
                                <td>{ticket.tensukien}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrangsudung === "Chưa sử dụng" &&
                                        <Typography style={Applied}><img src={green} alt={green} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Đã sử dụng" &&
                                        <Typography style={NotApply}><img src={blue} alt={blue} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Hết hạn" &&
                                        <Typography style={Over}><img src={red} alt={red} /> {ticket.tinhtrangsudung}</Typography>}
                                </td>
                                <td>{ticket.ngaysudung}</td>
                                <td>{ticket.ngayxuatve}</td>
                                <td>{ticket.congcheckin}</td>
                                <td> <button className="button-more" onClick={() => { Change(ticket.key, ticket.id, ticket.sove, ticket.tensukien, ticket.ngayxuatve) }}><img src={more} alt={more} /></button></td>
                                <ChangeTicket
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    ticketID={keyID}
                                    id={propTicketCode}
                                    sove={propTicketNumber}
                                    tensukien={propTicketName}
                                    ngayhethan={propsTicketDueDate}
                                />
                            </tr>
                        )}
                    {!search &&
                        tickets.map((ticket) =>
                            <tr className="ticketmanagement-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.id}</td>
                                <td>{ticket.sove}</td>
                                <td>{ticket.tensukien}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrangsudung === "Chưa sử dụng" &&
                                        <Typography style={Applied}><img src={green} alt={green} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Đã sử dụng" &&
                                        <Typography style={NotApply}><img src={blue} alt={blue} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Hết hạn" &&
                                        <Typography style={Over}><img src={red} alt={red} /> {ticket.tinhtrangsudung}</Typography>}
                                </td>
                                <td>{ticket.ngaysudung}</td>
                                <td>{ticket.ngayxuatve}</td>
                                <td>{ticket.congcheckin}</td>
                                <td> <button className="button-more" onClick={() => { Change(ticket.key, ticket.id, ticket.sove, ticket.tensukien, ticket.ngayxuatve) }}><img src={more} alt={more} /></button></td>
                                <ChangeTicket
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    ticketID={keyID}
                                    id={propTicketCode}
                                    sove={propTicketNumber}
                                    tensukien={propTicketName}
                                    ngayhethan={propsTicketDueDate}
                                />
                            </tr>
                        )}
                    {!filterState &&
                        tickets.map((ticket) =>
                            <tr className="ticketmanagement-table-content">
                                <td>{ticket.stt}</td>
                                <td>{ticket.id}</td>
                                <td>{ticket.sove}</td>
                                <td>{ticket.tensukien}</td>
                                <td className='setting-tinhtrang'>
                                    {ticket.tinhtrangsudung === "Chưa sử dụng" &&
                                        <Typography style={Applied}><img src={green} alt={green} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Đã sử dụng" &&
                                        <Typography style={NotApply}><img src={blue} alt={blue} /> {ticket.tinhtrangsudung}</Typography>}
                                    {ticket.tinhtrangsudung === "Hết hạn" &&
                                        <Typography style={Over}><img src={red} alt={red} /> {ticket.tinhtrangsudung}</Typography>}
                                </td>
                                <td>{ticket.ngaysudung}</td>
                                <td>{ticket.ngayxuatve}</td>
                                <td>{ticket.congcheckin}</td>
                                <td> <button className="button-more" onClick={() => { Change(ticket.key, ticket.id, ticket.sove, ticket.tensukien, ticket.ngayxuatve) }}><img src={more} alt={more} /></button></td>
                                <ChangeTicket
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    ticketID={keyID}
                                    id={propTicketCode}
                                    sove={propTicketNumber}
                                    tensukien={propTicketName}
                                    ngayhethan={propsTicketDueDate}
                                />
                            </tr>
                        )}

                </table>
                <div className='pagination'>

                    {pageNumbers.map(number => (
                        <div>
                            <button className="back-management" onClick={() => btnBack(number)}>
                                <img src={back} alt="back" />
                            </button>

                            <div key={number} className='items-page-management' onClick={() => Pagination(number)} >
                                <a className='links-page-management'>
                                    {number}
                                </a>
                            </div>

                            <button className="next-management" onClick={() => btnNext(number)}>
                                <img src={next} alt="next" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ticketmanagement