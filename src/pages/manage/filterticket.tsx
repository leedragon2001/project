import { useEffect, useState } from "react";
import { Gates } from "./gate";
import './filterticket.scss'
import { Button, Modal } from "antd";
import Celendar from '../home/celendar'
import 'antd/dist/antd.css';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";


interface Ticket {

    stt: number,
    id: string,
    tensukien: string,
    sove: number,
    ngaysudung: string,
    ngayxuatve: string,
    tinhtrangsudung: string,
    congcheckin: string

}

const FilterTicket = (props: any) => {
    // const FilterTicket = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [allCheck, setAllCheck] = useState<boolean>(false);
    const [check, setCheck] = useState<string[]>([]);
    const [list, setList] = useState([""]);
    const [selectedOption, setSelectedOption] = useState();
    const [status, setSatus] = useState();
    const [gate, setGate] = useState()
    const [filterResult, setFilterResult] = useState<Ticket[]>([]);

    const usersCollectionRef = collection(db, "ticketlist");
    useEffect(() => {
        const getTickets = async () => {
            const res = await getDocs(usersCollectionRef)
                .then((res) => setTickets(res.docs.map((doc: any) => ({ ...doc.data(), key: doc.id }))))
        };

        getTickets();
    }, []);



    useEffect(() => {
        setList(Gates);
    }, [list]);

    const handleSelect = (e: any) => {
        setAllCheck(!allCheck);
        setCheck(list.map((li: any) => li));

        if (!allCheck) {
            setCheck([
                "Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"
            ]);
            console.log(check)
        }


    };

    const handleClick = (e: any) => {
        const { id, checked } = e.target;
        setCheck([...check, id]);
        if (!checked) {
            setCheck(check.filter(item => item !== id));
        }
    };


    useEffect(() => {
        console.log(applicableDate)
    }, [applicableDate])

    const handleCancel = () => { props.setOpenModal(false) };

    const Filter = () => {
        setFilterResult([])
        props.setParent([])
        console.log(check.length)
        tickets.filter(value => {
            if (status === "Tất cả" && check.length >= 5) {
                setFilterResult(tickets)
                props.setParent(tickets)
            } else if (status === "Tất cả" && check.length !== 5) {
                check.filter((id) => {
                    {
                        if (id === value.congcheckin) {
                            props.setParent((tickets: any) => [...tickets, value])
                            console.log(value)
                        }
                    }
                })
            } else if (status !== "Tất cả" && value.tinhtrangsudung === status) {
                check.filter((id) => {
                    if (id === value.congcheckin) {
                        props.setParent((tickets: any) => [...tickets, value])
                        console.log(value)
                    }
                })
            }
        })
        props.setOpenModal(false);
    }

    return (

        <Modal
            centered
            closable={false}
            footer={null}
            visible={props.openModal}
            onCancel={handleCancel}
            width={600}

        >
            <div className="filter-ticket">
                <h1 className="filter-header">Lọc vé</h1>
                <label className="filter-fromdate-label">Từ ngày</label>
                <div className="filter-fromdate-date">
                    <Celendar format="DD/MM/YY" startday={setApplicableDate} />
                </div>
                <label className="filter-todate-label">Đến ngày</label>
                <div className="filter-todate-date">
                    <Celendar format="DD/MM/YY" endday={setDueDate} />
                </div>
                <label className="filter-status-text">Tình trạng sử dụng</label>
                <div className="filter-status">
                    <input className="radio-tatca" id="tất cả" type="radio" value="Tất cả" name="status" onChange={(e: any) => setSatus(e.target.value)} />
                    <label className="label-tatca" htmlFor="tất cả">Tất cả</label>

                    <input className="radio-dasudung" id="đã sử dụng" type="radio" value="Đã sử dụng" name="status" onChange={(e: any) => setSatus(e.target.value)} />
                    <label className="label-dasudung" htmlFor="đã sử dụng">Đã sử dụng</label>

                    <input className="radio-chuasudung" id="chưa sử dụng" type="radio" value="Chưa sử dụng" name="status" onChange={(e: any) => setSatus(e.target.value)} />
                    <label className="label-chuasudung" htmlFor="chưa sử dụng">Chưa sử dụng</label>

                    <input className="radio-hethan" id="hết hạn" type="radio" value="Hết hạn" name="status" onChange={(e: any) => setSatus(e.target.value)} />
                    <label className="label-hethan" htmlFor="hết hạn">Hết hạn</label>
                </div>

                <label className="filter-checkin-label">Cổng check-in</label>
                <div className="filter-checkin-gate">
                    <input className="checkbox-gatetatca" type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelect}
                        checked={allCheck} />
                    <label className="label-gatetatca" htmlFor="selectAll">Tất cả</label>

                    <input className="checkbox-gate1" type="checkbox" id="Cổng 1" name="Cong" value="Cổng 1" onChange={handleClick} checked={check.includes("Cổng 1")} />
                    <label className="label-gate1" htmlFor="gate-1">Cổng 1</label>

                    <input className="checkbox-gate2" type="checkbox" id="Cổng 2" name="Cong" value="Cổng 2" onChange={handleClick} checked={check.includes("Cổng 2")} />
                    <label className="label-gate2" htmlFor="gate-2">Cổng 2</label>

                    <input className="checkbox-gate3" type="checkbox" id="Cổng 3" name="Cong" value="Cổng 3" onChange={handleClick} checked={check.includes("Cổng 3")} />
                    <label className="label-gate3" htmlFor="gate-3">Cổng 3</label>

                    <input className="checkbox-gate4" type="checkbox" id="Cổng 4" name="Cong" value="Cổng 4" onChange={handleClick} checked={check.includes("Cổng 4")} />
                    <label className="label-gate4" htmlFor="gate-4">Cổng 4</label>

                    <input className="checkbox-gate5" type="checkbox" id="Cổng 5" name="Cong" value="Cổng 5" onChange={handleClick} checked={check.includes("Cổng 5")} />
                    <label className="label-gate5" htmlFor="gate-5">Cổng 5</label>
                </div>
                <button className="filter-button" onClick={Filter}>Lọc</button>
            </div>
        </Modal>
    )
        ;
}
export default FilterTicket;