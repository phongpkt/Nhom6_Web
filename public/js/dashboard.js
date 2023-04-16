const ctx = document.getElementById("myChart");
const departments = ["Accounting", "Marketing", "Research and Development"];
  
new Chart(ctx, {
  type: "bar",
  data: {
    labels: departments,
    datasets: [
      {
        label: "Number of ideas per department compared to current toppic",
        data: [1, 1, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const chartLine = document.getElementById("myChartLine");

new Chart(chartLine, {
  type: "line",
  data: {
    labels: [
      "Accounting",
      "Marketing",
      "Research and Development",
    ],
    datasets: [
      {
        label:
          "Number of ideas for each department compared to the month of each year",
        data: [0, 1, 3],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Line Chart",
    },
    reponsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const chartPie = document.getElementById("myChartPie");

new Chart(chartPie, {
  type: "pie",
  data: {
    labels: [
      "Accounting",
      "Marketing",
      "Research and Development",
    ],
    datasets: [
      {
        backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        data: [418, 218, 268],
      },
    ],
  },
});
