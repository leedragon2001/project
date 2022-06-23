import { Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
    return (
        <div>
            <Pie
                data={{
                    labels: ['Orange', 'Blue'],
                    datasets: [
                        {
                            label: '# of vote',
                            data: [12, 19],
                            backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
                            borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
                            borderWidth: 1,
                        },
                    ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    // legend: {
                    //     labels: {
                    //         fontSize: 25
                    //     }
                    // }
                }}
            />
        </div>
    )
}

export default PieChart