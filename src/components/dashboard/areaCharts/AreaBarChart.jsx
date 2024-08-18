  import { useContext, useEffect, useState } from "react";
  import axios from "axios";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  import { ThemeContext } from "../../../context/ThemeContext";
  import { LIGHT_THEME } from "../../../constants/themeConstants";
  import "./AreaCharts.scss";

  const AreaBarChart = () => {
    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState([]);
    const [totalCgpa, setTotalCgpa] = useState(0); // State to store the sum of cgpa

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/sem");
          setData(response.data);

          // Calculate total cgpa after data is fetched
          const cgpaSum = response.data.reduce((acc, curr) => acc + curr.cgpa, 0);
          setTotalCgpa(cgpaSum);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, []);

    const formatTooltipValue = (value) => {
      return `${value}`;
    };

    const formatYAxisLabel = (value) => {
      return `${value}`;
    };

    const formatLegendValue = (value) => {
      return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
      <div className="bar-chart">
        <div className="bar-chart-info">
          <h5 className="bar-chart-title">SEMESTER</h5>
          <div className="chart-info-data">
            <div className="info-data-value">
              {(totalCgpa / data.length).toFixed(2)}
            </div>
            <div className="info-data-text">
              <p> / 10.00</p>
            </div>
          </div>
        </div>
        <div className="bar-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={200}
              data={data}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis
                padding={{ left: 10 }}
                dataKey="num"
                tickSize={0}
                axisLine={false}
                tick={{
                  fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                  fontSize: 14,
                }}
              />
              <YAxis
                padding={{ bottom: 10, top: 10 }}
                tickFormatter={formatYAxisLabel}
                tickCount={6}
                axisLine={false}
                tickSize={1}
                tick={{
                  fill: `${theme === LIGHT_THEME ? "#676767" : "#f3f3f3"}`,
                }}
              />
              <Tooltip
                formatter={formatTooltipValue}
                cursor={{ fill: "transparent" }}
              />
              <Legend
                iconType="circle"
                iconSize={10}
                verticalAlign="top"
                align="right"
                formatter={formatLegendValue}
              />
              <Bar
                dataKey="cgpa"
                fill="#475be8"
                activeBar={false}
                isAnimationActive={false}
                barSize={24}
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  export default AreaBarChart;
