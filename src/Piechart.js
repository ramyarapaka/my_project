import React from "react";
import Chart from 'react-google-charts';

const PieChart = () => {
    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7], // CSS-style declaration
    ];

    const options = {
        pieHole: 0.4,
        is3D: false,
    };

    // Set a larger height for the chart
    const chartHeight = 200;

    return (
        <div className='col-md-12'>
            <Chart
                chartType="PieChart"
                width="110%"
                height={chartHeight}
                data={data}
                options={options}
            />
        </div>
    );
};
export default PieChart;
