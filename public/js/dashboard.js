const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Department 1",
      "Department 2",
      "Department 3",
      "Department 4",
      "Department 5",
      "Department 6",
    ],
    datasets: [
      {
        label: "Number of ideas per department compared to current toppic",
        data: [12, 19, 3, 5, 2, 3],
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
      "Department 1",
      "Department 2",
      "Department 3",
      "Department 4",
      "Department 5",
      "Department 6",
    ],
    datasets: [
      {
        label:
          "Number of ideas for each department compared to the month of each year",
        data: [11, 59, 80, 31, 56, 75, 40],
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
      "Department 1",
      "Department 2",
      "Department 3",
      "Department 4",
      "Department 5",
      "Department 6",
    ],
    datasets: [
      {
        backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        data: [418, 218, 268, 351, 212, 430],
      },
    ],
  },
});
