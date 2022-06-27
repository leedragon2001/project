import { useEffect, useState } from "react";
import { Gates } from "./gate";
import './filterticket.scss'

const FilterTicket = () => {
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
    console.log(check);


    return (
        <div className="filter-ticket">
            <h1 className="filter-header">Lọc vé</h1>

            <label className="filter-fromdate-label">Từ ngày</label>
            <input className="filter-fromdate-input" type="date" onChange={(e: any) => { setApplicableDate(e.target.value) }} />

            <label className="filter-todate-label">Đến ngày</label>
            <input className="filter-todate-input" type="date" onChange={(e: any) => { setDueDate(e.target.value) }} />

            <label className="filter-status-text">Tình trạng sử dụng</label>
            <div className="filter-status">

                <input id="tất cả" type="radio" value="Tất cả" name="status" checked={selectedOption === "Tất cả"} onChange={onChangeValue} />
                <label htmlFor="tất cả">Tất cả</label>

                <input id="đã sử dụng" type="radio" value="Đã sử dụng" name="status" checked={selectedOption === "Đã sử dụng"} onChange={onChangeValue} />
                <label htmlFor="đã sử dụng">Đã sử dụng</label>

                <input id="chưa sử dụng" type="radio" value="Chưa sử dụng" name="status" checked={selectedOption === "Chưa sử dụng"} onChange={onChangeValue} />
                <label htmlFor="chưa sử dụng">Chưa sử dụng</label>

                <input id="hết hạn" type="radio" value="Hết hạn" name="status" checked={selectedOption === "Hết hạn"} onChange={onChangeValue} />
                <label htmlFor="hết hạn">Hết hạn</label>
            </div>

            <label className="filter-checkin-label">Cổng check-in</label>
            <div className="filter-checkin-gate">
                {/* <input type="checkbox" className="check-all" name="Tất cả" value="Tất cả"/> */}
                <input type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={checkAll} />
                <label htmlFor="selectAll">Tất cả</label>
                <input type="checkbox" id="gate-1" name="Cổng 1" value="Cổng 1" onChange={handleClick} checked={check.includes("gate-1")} />
                <label htmlFor="gate-1">Cổng 1</label>
                <input type="checkbox" id="gate-2" name="Cổng 2" value="Cổng 2" onChange={handleClick} checked={check.includes("gate-2")} />
                <label htmlFor="gate-2">Cổng 2</label>
                <input type="checkbox" id="gate-3" name="Cổng 3" value="Cổng 3" onChange={handleClick} checked={check.includes("gate-3")} />
                <label htmlFor="gate-3">Cổng 3</label>
                <input type="checkbox" id="gate-4" name="Cổng 4" value="Cổng 4" onChange={handleClick} checked={check.includes("gate-4")} />
                <label htmlFor="gate-4">Cổng 4</label>
                <input type="checkbox" id="gate-5" name="Cổng 5" value="Cổng 5" onChange={handleClick} checked={check.includes("gate-5")} />
                <label htmlFor="gate-5">Cổng 5</label>
            </div>


            <div className="filter-button-holder">
                <button className="filter-button">Lọc</button>
            </div>

        </div>
    );
}
export default FilterTicket;