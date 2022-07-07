import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './celendar.scss'
import moment from "moment";

type PickerType = "time" | "date" | "week" | "month" | "quarter" | "year" | undefined

const Celendar = ({ format = "MM/YYYY", placeholder = "dd/mm/yy", onClick }: any) => {
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
        // onClick(date, dateString)
    };
    const [value, setValue] = useState<PickerType>("date");

    const onChangePickerType = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    // const [applicableDate, setApplicableDate] = useState<string | undefined>();
    // const callback = (date: string | undefined) => {
    //     setApplicableDate(date)
    // }
    return (
        <div>
            <DatePicker
                showToday={value !== undefined ? false : undefined}
                picker={value}
                placeholder={placeholder}
                onChange={onChange}
                format={format}
                defaultValue={moment()}
                // onClick={callback}
                renderExtraFooter={() => (
                    <Radio.Group onChange={onChangePickerType} value={value}>
                        <Radio value="date">Theo ngày</Radio>
                        <Radio value="week">Theo tuần</Radio>
                    </Radio.Group>
                )}
            />
        </div>
    )
};

export default Celendar;