import "./checkticket.scss";
import { Typography } from "@material-ui/core";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Celendar from "../home/celendar";
import moment from "moment";
import Paginate from "../pagination";
import { CSVLink } from 'react-csv'
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
    const [applicableDate, setApplicableDate] = useState();
    const [dueDate, setDueDate] = useState();

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
        if (status === "Tất cả") {
            setFilterResult(tickets);
        }
        else {
            let result = tickets;
            setFilterResult(result.filter((value) => value.tinhtrangve === status));
        }
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
                    <Paginate />
                </table>
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
                        // setApplicableDate={setApplicableDate}
                        // StartDate={StartDate}
                        />
                    </div>
                </div>
                <div>
                    <label className="checkticket-todate-filter-label">Đến ngày</label>
                    <div className="checkticket-todate-filter-input">
                        <Celendar format="DD/MM/YY"
                        // setDueDate={setDueDate}
                        // EndDate={EndDate}
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
