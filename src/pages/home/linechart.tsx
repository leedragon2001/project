import { Area } from '@ant-design/plots';

const LineChart = () => {
    const dataValue = [
        { day: 'Thứ 2', value: 150 },
        { day: 'Thứ 3', value: 130 },
        { day: 'Thứ 4', value: 180 },
        { day: 'Thứ 5', value: 260 },
        { day: 'Thứ 6', value: 250 },
        { day: 'Thứ 7', value: 280 },
        { day: 'CN', value: 350 },
    ];

    const config = {
        data: dataValue,
        xField: 'day',
        yField: 'value',
        color: '#FAA05F',
        xAxis: {
            range: [0, 1],
        },
        yAxis: {
            range: [0, 1],
        },
        areaStyle: {
            fill: 'l(270) 0:#ffffff 1:#FAA05F',
        },
        smooth: true,
    };

    return <Area {...config} />;
};

export default LineChart;