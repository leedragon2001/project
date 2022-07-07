import { useEffect, useState } from "react";
import { Gates } from "./gate";
import './filterticket.scss'
import { Button, Modal } from "antd";
import Celendar from '../home/celendar'
import 'antd/dist/antd.css';



const FilterTicket = ({ openModal, setOpenModal }: any) => {
    // const FilterTicket = () => {
    const [applicableDate, setApplicableDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [checkAll, setCheckAll] = useState(false);
    const [check, setCheck] = useState(["casd", "ASdf"]);
    const [list, setList] = useState([""]);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        setList(Gates);
    }, [list]);

    const handleSelectAll = (e: any) => {
        setCheckAll(!checkAll);
        setCheck(list.map((li: any) => li));
        if (checkAll) {
            setCheck([]);
        }
    };

    const handleClick = (e: any) => {
        const { id, checked } = e.target;
        setCheck([...check, id]);
        if (!checked) {
            setCheck(check.filter(item => item !== id));
        }
    };

    const onChangeValue = (event: any) => {
        setSelectedOption(event.target.value);
    }

    const handleOk = () => {
        setOpenModal(false);
    };
    const handleCancel = () => { setOpenModal(false) };


    return (

        <Modal
            centered
            closable={false}
            footer={null}
            // title="Lọc vé"
            visible={openModal}
            onCancel={handleCancel}
            width={600}

        >
            <div className="filter-ticket">
                <h1 className="filter-header">Lọc vé</h1>
                <label className="filter-fromdate-label">Từ ngày</label>
                <div className="filter-fromdate-date">
                    <Celendar format="DD/MM/YY" />
                </div>
                <label className="filter-todate-label">Đến ngày</label>
                <div className="filter-todate-date">
                    <Celendar format="DD/MM/YY" />
                </div>
                <label className="filter-status-text">Tình trạng sử dụng</label>
                <div className="filter-status">
                    <input className="radio-tatca" id="tất cả" type="radio" value="Tất cả" name="status" checked={selectedOption === "Tất cả"} onChange={onChangeValue} />
                    <label className="label-tatca" htmlFor="tất cả">Tất cả</label>

                    <input className="radio-dasudung" id="đã sử dụng" type="radio" value="Đã sử dụng" name="status" checked={selectedOption === "Đã sử dụng"} onChange={onChangeValue} />
                    <label className="label-dasudung" htmlFor="đã sử dụng">Đã sử dụng</label>

                    <input className="radio-chuasudung" id="chưa sử dụng" type="radio" value="Chưa sử dụng" name="status" checked={selectedOption === "Chưa sử dụng"} onChange={onChangeValue} />
                    <label className="label-chuasudung" htmlFor="chưa sử dụng">Chưa sử dụng</label>

                    <input className="radio-hethan" id="hết hạn" type="radio" value="Hết hạn" name="status" checked={selectedOption === "Hết hạn"} onChange={onChangeValue} />
                    <label className="label-hethan" htmlFor="hết hạn">Hết hạn</label>
                </div>

                <label className="filter-checkin-label">Cổng check-in</label>
                <div className="filter-checkin-gate">
                    <input className="checkbox-gatetatca" type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelectAll}
                        checked={checkAll} />
                    <label className="label-gatetatca" htmlFor="selectAll">Tất cả</label>
                    <input className="checkbox-gate1" type="checkbox" id="gate-1" name="Cổng 1" value="Cổng 1" onChange={handleClick} checked={check.includes("gate-1")} />
                    <label className="label-gate1" htmlFor="gate-1">Cổng 1</label>

                    <input className="checkbox-gate2" type="checkbox" id="gate-2" name="Cổng 2" value="Cổng 2" onChange={handleClick} checked={check.includes("gate-2")} />
                    <label className="label-gate2" htmlFor="gate-2">Cổng 2</label>

                    <input className="checkbox-gate3" type="checkbox" id="gate-3" name="Cổng 3" value="Cổng 3" onChange={handleClick} checked={check.includes("gate-3")} />
                    <label className="label-gate3" htmlFor="gate-3">Cổng 3</label>

                    <input className="checkbox-gate4" type="checkbox" id="gate-4" name="Cổng 4" value="Cổng 4" onChange={handleClick} checked={check.includes("gate-4")} />
                    <label className="label-gate4" htmlFor="gate-4">Cổng 4</label>

                    <input className="checkbox-gate5" type="checkbox" id="gate-5" name="Cổng 5" value="Cổng 5" onChange={handleClick} checked={check.includes("gate-5")} />
                    <label className="label-gate5" htmlFor="gate-5">Cổng 5</label>
                </div>
                <button className="filter-button" onClick={handleOk}>Lọc</button>
            </div>
        </Modal>
    )
        ;
}
export default FilterTicket;