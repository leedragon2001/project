import { TimePicker } from "antd";
import type { Moment } from "moment";
import moment from "moment";

const Time = ({ starttime, endtime }: any) => {
    const onChange = (time: Moment | null, timeString: string) => {
        console.log(time, timeString);
        if (time) {
            if (starttime) { starttime(timeString) }
            if (endtime) { endtime(timeString) }
        }
    };
    return (
        <div>
            <TimePicker defaultValue={moment()} onChange={onChange} showNow={false} placeholder="hh:mm:ss" />
        </div>
    );

};

export default Time;
