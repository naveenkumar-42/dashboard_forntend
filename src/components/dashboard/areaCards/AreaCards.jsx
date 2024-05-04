import { useState, useEffect } from "react";
import axios from "axios";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/training_status");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="content-area-cards">
        {data.map((item) => (
          <div className="content-Area" key={item.id}>
            <AreaCard
              colors={["#e4e8ef", "#475be8"]}
              percentFillValue={item.training_assessment_percent * 10}
              cardInfo={{
                title: (
                  <span style={{ color: "#475be8" }}>{item.training_status}</span>
                ),
                value: item.training_attended,
                text: item.training_attendance_percent,
              }}
            />
            <AreaCard
             colors={["#e4e8ef", "#4ce13f"]}
              percentFillValue={item.mock_assessment_percent}
              cardInfo={{
                title: (
                  <span style={{ color: "#4ce13f" }}>{item.mock_assessment_status}</span>
                ),
                value: item.mock_attended,
                text: item.mock_attendance_percent,
              }}
            />
            <AreaCard
              colors={["#e4e8ef", "#f29a2e"]}
              percentFillValue={item.interim_assessment_percent}
              cardInfo={{
                title:(
                  <span style={{ color: "#f29a2e" }}>{item.interim_assessment_status  }</span>
                ),
                value: item.interim_attended,
                text: item.interim_attendance_percent,
              }}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default AreaCards;
