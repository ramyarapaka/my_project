import React from 'react'
import Chart from 'react-google-charts';
 
const Linechart = () => {
    const data = [
        ["x", "Apples", "Promograntes"],
        [0, 0, 0],
        [1, 10, 5],
        [2, 11, 15],
        [3, 13, 9],
        [4, 8, 10],
        [5, 9, 5],
        [6, 11, 3],
        [7, 15, 19],
    ];
    const options = {
        hAxis: {
            title: "Top Points Gainer",
        },
        vAxis: {
            title: "Leader Board",
        },
        series: {
            1: { curveType: "function" },
        },
    };
    return (
        <div className='col-md-12'>
            <Chart chartType="LineChart" width="100%" height="200px" data={data} options={options} />
        </div>
    )
}
export default Linechart