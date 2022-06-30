import { DatePicker, DatePickerProps, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './celendar.scss'

type PickerType = "time" | "date" | "week" | "month" | "quarter" | "year" | undefined

const Celendar = ({ format = "MM/YYYY" }) => {
    const onChange: DatePickerProps["onChange"] = (date, dateString) => {
        console.log(date, dateString);
    };
    const [value, setValue] = useState<PickerType>("date");

    const onChangePickerType = (e: RadioChangeEvent) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
    };
    return (
        <div>
            {/* <DatePicker onChange={onChange} picker="date" /> */}
            <DatePicker
                showToday={value !== undefined ? false : undefined}
                picker={value}
                placeholder="dd/mm/yy"
                onChange={onChange}
                format={format}
                renderExtraFooter={() => (
                    <Radio.Group className="flex justify-center my-3" onChange={onChangePickerType} value={value}>
                        <Radio value="date">Theo ngày</Radio>
                        <Radio value="week">Theo tuần</Radio>
                    </Radio.Group>
                )}
            />
        </div>
    )
};

export default Celendar;