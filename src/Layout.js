import React from "react";
import Chart from 'react-google-charts';

const Layout = () => {
    return (
        <Chart
      width={"100%"}
      height={"100%"}
      chartType="BarChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Name", "Age"],
        ["Bunny", 12],
        ["Ramya", 20],
        ["Sanju", 7],
        ["John", 54],
        ["Abbu", 22],
        ["Chutki", 3],
        ["Anil", 42],
        ["Quddus", 33],
      ]}
      rootProps={{ "data-testid": "6" }}
      chartPackages={["corechart", "controls"]}
      render={({ renderControl, renderChart }) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ width: "40%" }}>{renderControl(() => true)}</div>
            <div style={{ width: "60%" }}>{renderChart()}</div>
          </div>
        );
      }}
      controls={[
        {
          controlType: "StringFilter",
          options: {
            filterColumnIndex: 0,
            matchType: "any", // 'prefix' | 'exact',
            ui: {
              label: "Search by name",
            },
          },
        },
        {
          controlType: "NumberRangeFilter",
          controlID: "age-filter",
          options: {
            filterColumnIndex: 1,
            ui: {
              labelStacking: "vertical",
              label: "Age Selection:",
              allowTyping: false,
              allowMultiple: false,
            },
          },
        },
      ]}
    />
    );
};

export default Layout;
