export const createDataset = (stats) => {
  const statValues = stats.map((stat) => stat.base_stat);
  const statStyle = {
    backgroundColor: [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
      "rgba(255, 159, 64, 0.6)",
      "rgba(255, 99, 132, 0.6)",
    ],
    borderWidth: 2,
    borderColor: "#777",
    hoverBorderWidth: 3,
    hoverBorderColor: "#000",
  };
  return [
    {
      label: "Statistics",
      data: statValues,
      backgroundColor: statStyle.backgroundColor,
      borderWidth: statStyle.borderWidth,
      borderColor: statStyle.borderColor,
      hoverBorderWidth: statStyle.hoverBorderWidth,
      hoverBorderColor: statStyle.hoverBorderColor,
    },
  ];
};
