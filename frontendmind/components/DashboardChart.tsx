import React from 'react';
import { Chart } from 'react-google-charts';

const data = [
  ["Mês", "Receitas", "Despesas"],
  ["7/2022", 4000, 2400],
  ["8/2022", 8000, 3600],
  ["9/2022", 9000, 4000],
  ["10/2022", 8500, 4200],
];

const options = {
  chart: {
    title: "Receitas x Despesas",
    subtitle: "Comparativo mensal de receitas e despesas",
  },
  hAxis: {
    title: "Mês",
  },
  vAxis: {
    title: "Valor",
  },
  series: {
    1: { curveType: "function" },
  },
};

const DashboardChart: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Receitas x Despesas</h2>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default DashboardChart;
