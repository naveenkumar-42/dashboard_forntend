import { useState, useEffect } from 'react';

const AreaProgressChart = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:3001/s_archivement')
      .then(response => response.json())
      .then(data => {
        setAchievements(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Achievement Progress</h4>
      </div>
      <div className="progress-bar-list">
        {achievements.map((achievement, index) => (
          <div className="progress-bar-item" key={index}>
            {Object.entries(achievement).map(([key, value]) => (
              <div className="bar-item-info" key={key}>
                <p className="bar-item-in fo-name">{key}</p>
                <div className="bar-item-full">
                  <div   
                    className="bar-item-filled"
                    style={{
                      width: `${(value / 5) * 100}%`, // Assuming 3 is the maximum number of achievements for scaling
                    }}
                  ></div> 
                </div>
                <p className="bar-item-info-value">{value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaProgressChart;
