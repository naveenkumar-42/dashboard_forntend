import{ useState, useEffect } from "react";
import axios from "axios";
import "./AreaTable.scss";

const TABLE_HEADS = [
  "Semester",
  "Skill Code",
  "Skill Name",
  "Skill Type",
  "Student Mark",
  "Faculity Mark",
];

const AreaTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/s_skill"); // Adjust URL to match your server endpoint
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Student Details</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((dataItem) => {
              return (
                <tr key={dataItem.c_sem}>
                  <td>{dataItem.c_sem}</td>
                  <td>{dataItem.s_code}</td>
                  <td>{dataItem.s_name}</td>
                  <td>{dataItem.s_type}</td>
                  <td>{dataItem.s_mark}</td>
                  <td>{dataItem.t_mark}</td>            
                  <td className="dt-cell-action">
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
