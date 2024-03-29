import "./checkticket.scss";
import { Typography } from "@material-ui/core";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Celendar from "../home/celendar";
import moment from "moment";
import Paginate from "../pagination";
import { CSVLink } from 'react-csv'
import next from '../../assets/next.png'
import back from '../../assets/back.png'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'


interface Ticket {
    stt: number;
    sove: string;
    tensukien: string;
    tenloaive: string;
    ngaysudung: string;
    congcheckin: string;
    tinhtrangve: string;
}

const Checkticket = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const usersCollectionRef = collection(db, "checklist");
    const [filterResult, setFilterResult] = useState<Ticket[]>([]);
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [filterDayResult, setFilterDayResult] = useState<Ticket[]>([]);
    var chooseapplicableDate
    var choosedueDate
    var chooseapplicableMonth
    var choosedueMonth

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

    const getTickets = async () => {
        const res = await getDocs(usersCollectionRef).then((res) => {
            setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id })));
        });
    };
    useEffect(() => {
        getTickets();
    }, []);

    useEffect(() => {
        setFilterResult(tickets);
    }, [tickets]);

    useEffect(() => {
        if (search === "") setFilterResult(tickets);
        setFilterResult((prev) =>
            prev.filter((e) => e.sove.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search]);

    const Filter = () => {
        setFilterResult([])
        setFilterDayResult([])


        tickets.filter(value => {
            if (isAfter(new Date(2022, Number(value.ngaysudung.slice(3, 5)) - 1, Number(value.ngaysudung.slice(0, 2))), new Date(2022, Number(applicableDate.slice(3, 5)) - 1, Number(applicableDate.slice(0, 2)))) && isBefore(new Date(2022, Number(value.ngaysudung.toString().slice(3, 5)) - 1, Number(value.ngaysudung.toString().slice(0, 2))), new Date(2022, Number(dueDate.slice(3, 5)) - 1, Number(dueDate.slice(0, 2))))) {
                filterDayResult.push(value)
                console.log(filterDayResult)
            }
        })

        filterDayResult.filter(value => {
            if (status === "Tất cả") {
                setFilterResult(filterDayResult)
                console.log(filterResult)
            }
            else if (value.tinhtrangve === status) {
                // let result = filterResult;
                setFilterResult((filterResult: any) => [...filterResult, value]);
            }
        })

    };

    const NotChanged = {
        fontSize: "15px",
        fontStyle: "italic",
        color: " #A5A8B1",
    };

    const Changed = {
        fontSize: "15px",
        fontStyle: "italic",
        color: "#FD5959",
    };

    const header = [
        { label: 'STT', key: 'stt' },

        { label: 'Số vé', key: 'sove' },
        { label: 'Tên sự kiện', key: 'tensukien' },
        { label: 'Ngày sử dụng', key: 'ngaysudung' },
        { label: 'Tên loại vé', key: 'tenloaive' },
        { label: 'Cổng check-in', key: 'congcheckin' },
        { label: 'Trạng Thái', key: 'tinhtrangve' }
    ]

    const csvReport = {
        filename: "File.csv",
        headers: header,
        data: tickets
    }

    return (
        <div className="checkticket-container">
            <div className="checkticket-list">
                <h1 className="checkticket-title">Check Ticket</h1>
                <input
                    className="checkticket-search"
                    type="text"
                    placeholder="Tìm bằng số vé"
                    onChange={(e) => setSearch(e.target.value)}
                />


                {!status &&
                    <button className="checkticket-doisoat">Chốt đối soát</button>
                }

                {status.includes("Chưa đối soát") &&
                    <button className="checkticket-doisoat">Chốt đối soát</button>
                }

                {status.includes("Tất cả") &&
                    <button className="checkticket-doisoat">Chốt đối soát</button>
                }

                {status === "Đã đối soát" &&

                    <CSVLink className="checkticket-csv" type="button" {...csvReport}>
                        Xuất file(.csv)
                    </CSVLink>

                }

                <table className="checkticket-body-table">
                    <tr className="checkticket-table-heading">
                        <th>STT</th>
                        <th>Số vé</th>
                        <th>Tên sự kiện</th>
                        <th>Ngày sử dụng</th>
                        <th>Tên loại vé</th>
                        <th>Cổng check-in</th>
                        <th className="hidden">Trạng thái</th>
                    </tr>

                    {filterResult.map((ticket) => (
                        <tr className="checkticket-table-content">
                            <td>{ticket.stt}</td>
                            <td>{ticket.sove}</td>
                            <td>{ticket.tensukien}</td>
                            <td>{ticket.ngaysudung}</td>
                            <td>{ticket.tenloaive}</td>
                            <td>{ticket.congcheckin}</td>
                            <td>
                                {ticket.tinhtrangve === "Chưa đối soát" && (
                                    <Typography style={NotChanged}>
                                        {ticket.tinhtrangve}
                                    </Typography>
                                )}
                                {ticket.tinhtrangve === "Đã đối soát" && (
                                    <Typography style={Changed}>{ticket.tinhtrangve}</Typography>
                                )}
                            </td>
                        </tr>
                    ))}
                </table>
                <div className='pagination'>
                    <button className="back-check" onClick={() => btnBack(currentPage)}>
                        <img src={back} alt="back" />
                    </button>
                    {pageNumbers.map(number => (
                        <div>
                            <div key={number} className='items-page' onClick={() => Pagination(number)} >
                                <a className='links-page-check'>
                                    {number}
                                </a>
                            </div>
                        </div>
                    ))}
                    <button className="next-check" onClick={() => btnNext(currentPage)}>
                        <img src={next} alt="next" />
                    </button>
                </div>
            </div>

            <div className="checkticket-body-right">
                <h1 className="checkticket-filter-heading">Lọc vé</h1>
                <p className="checkticket-filter">Tình trạng đối soát</p>
                <div className="checkticket-filter-options">
                    <div className="checkticket-radio-row">
                        <input
                            type="radio"
                            id="tat-ca"
                            name="fav_language"
                            value="Tất cả"
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <label htmlFor="tat-ca">Tất cả</label>
                    </div>
                    <div className="checkticket-radio-row">
                        <input
                            type="radio"
                            id="da-doi-soat"
                            name="fav_language"
                            value="Đã đối soát"
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <label htmlFor="da-doi-soat">Đã đối soát</label>
                    </div>
                    <div className="checkticket-radio-row">
                        <input
                            type="radio"
                            id="chua-doi-soat"
                            name="fav_language"
                            value="Chưa đối soát"
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <label htmlFor="chua-doi-soat">Chưa đối soát</label>
                    </div>
                </div>
                <div>
                    <label className="checkticket-ticket-type-filter-label">
                        Loại vé
                    </label>
                    <p className="checkticket-ticket-type-filter-input">Vé cổng</p>
                </div>
                <div>
                    <label className="checkticket-fromdate-filter-label">Từ ngày</label>
                    <div className="checkticket-fromdate-filter-input">
                        <Celendar format="DD/MM/YY"
                            startday={setApplicableDate}
                        />
                    </div>
                </div>
                <div>
                    <label className="checkticket-todate-filter-label">Đến ngày</label>
                    <div className="checkticket-todate-filter-input">
                        <Celendar format="DD/MM/YY"
                            endday={setDueDate}
                        />
                    </div>
                </div>

                <div>
                    <button className="checkticket-filter-button" onClick={Filter}>
                        Lọc
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkticket;
