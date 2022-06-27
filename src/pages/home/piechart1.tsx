
import { Pie } from '@ant-design/plots'

const PieChart1 = () => {
    const data = [
        {
            type: 'Vé đã sử dụng',
            value: 56024,
        },
        {
            type: 'Vé chưa sử dụng',
            value: 13568,
        },
    ]
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: ['#4F75FF', '#FF8A48'],
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            autoRotate: false,
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: true,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: '',
            },
        },
    }
    return <Pie {...config} />
}

export default PieChart1