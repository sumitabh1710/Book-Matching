import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import "./bookGraph.css";

const BookGraph = ({ genre, style, complexity, stepper, setStepper }) => {
  const [percentData, setPercentData] = useState([]);
  const handleBack = () => {
    if (stepper == 4) {
      setStepper(1);
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/book-match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        genre_id: genre.id,
        style_id: style.id,
        complexity_id: complexity.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const chartCanvas = document.getElementById("book_table");

        if (chartCanvas.chart) {
          chartCanvas.chart.destroy();
        }

        chartCanvas.chart = new Chart(chartCanvas, {
          type: "bar",
          data: {
            labels: data.map((row) => row.title),
            datasets: [
              {
                label: "Book matching Percentage",
                data: data.map((row) => row.percent),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                  "rgba(255, 205, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                  "rgb(255, 99, 132)",
                  "rgb(255, 159, 64)",
                  "rgb(255, 205, 86)",
                  "rgb(75, 192, 192)",
                  "rgb(54, 162, 235)",
                  "rgb(153, 102, 255)",
                  "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
            font: {
              family: "Nova Square",
              size: 14,
              style: "italic",
              color: "black",
            },
          },
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="book_graph">
      <p className="intial_header"> Your Match Percentage </p>
      <div className="book_table" style={{ width: "500px" }}>
        <canvas id="book_table"></canvas>
      </div>
      <div className="next_button" onClick={() => handleBack()}>
        <p style={{ color: "whitesmoke" }}>Back</p>
      </div>
    </div>
  );
};

export default BookGraph;
