
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
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { Pagination } from "../pagination";

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
    const [openModal, setOpenModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState<Ticket["ticket"]>([]);
    const [tickets, setTickets] = useState<Ticket["ticket"]>([]);
    const usersCollectionRef = collection(db, "ticketlist");
    useEffect(() => {
        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);

    useEffect(() => {
        setResult([]);
        tickets.filter(value => {
            if (value.sove.toString().includes(search)) {
                setResult(result => [...result, value])
            }
            else if (value.tensukien.toLowerCase().includes(search)) {
                setResult(result => [...result, value])
            }
            else if (value.id.toLowerCase().includes(search)) {
                setResult(result => [...result, value])
            }
        })

    }, [search])

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

    const Change = () => {
        setShowModal(true);
    }

    // const columns: ColumnsType<Ticket> = [
    //     {
    //         title: 'STT',
    //         dataIndex: 'stt',
    //         key: 'stt',
    //     },
    //     {
    //         title: 'id',
    //         dataIndex: 'id',
    //         key: 'id',
    //     },
    //     {
    //         title: 'Số vé',
    //         dataIndex: 'sove',
    //         key: 'sove',
    //     },
    //     {
    //         title: 'Tên sự kiện',
    //         dataIndex: 'tensukien',
    //         key: 'tensukien',
    //     },
    //     {
    //         title: 'Tình trạng sử dụng',
    //         key: 'tinhtrangsudung',
    //         dataIndex: 'tinhtrangsudung',
    //         render: (_, { tinhtrangsudung }) => (
    //             <>
    //                 {tinhtrangsudung.map((ticket: any) => {
    //                     let color = ticket.length > 5 ? 'geekblue' : 'green';
    //                     if (ticket === 'loser') {
    //                         color = 'volcano';
    //                     }
    //                     return (
    //                         <Tag color={color} key={ticket}>
    //                             {ticket.toUpperCase()}
    //                         </Tag>
    //                     );
    //                 })}
    //             </>
    //         ),
    //     },
    //     {
    //         title: 'Ngày sử dụng',
    //         dataIndex: 'ngaysudung',
    //         key: 'ngaysudung',
    //     },
    //     {
    //         title: 'Ngày xuất vé',
    //         dataIndex: 'ngayxuatve',
    //         key: 'ngayxuatve',
    //     },
    //     {
    //         title: 'Cổng check-in',
    //         dataIndex: 'congcheckin',
    //         key: 'congcheckin',
    //     },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
    // ];
    // const data: Ticket= [
    //     tickets:{
    //         stt: 1,
    //         id: 'ALT10000',
    //         tensukien: 'A',
    //         sove: '23186AC',
    //         ngaysudung: '14/4/2021',
    //         ngayxuatve: '14/4/2021',
    //         congcheckin: 'Cổng 1',
    //     },
    // ];

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
                />
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
                        <th></th>
                    </tr>
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
                                <td> <button className="button-more" onClick={Change}><img src={more} alt={more} /></button></td>
                                <ChangeTicket
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                />
                            </tr>
                        )}
                    {search &&
                        result.map((ticket) =>
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

                            </tr>
                        )
                    }
                    <Pagination
                        pageCount={1}
                        onChange={function ({ selected }: { selected: number; }): void {
                            throw new Error("Function not implemented.");
                        }} />
                </table>
            </div>
        </div>
    );
}

export default Ticketmanagement