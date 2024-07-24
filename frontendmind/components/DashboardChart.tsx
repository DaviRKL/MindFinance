import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface Finance {
  id: number;
  description: string;
  amount: number;
  createdAt: string;
  type: "INCOME" | "EXPENSE";
}

interface DashboardChartProps {
  finances: Finance[];
}

const DashboardChart: React.FC<DashboardChartProps> = ({ finances }) => {
  const [data, setData] = useState<(string | number)[][]>([["Mês", "Rendas", "Despesas"]]);

  useEffect(() => {
    if (finances.length === 0) {
      toast.info('Crie sua primeira transação!');
    }

    const processFinances = (finances: Finance[]) => {
      const monthlyData = finances.reduce((acc, finance) => {
        const dateMonthYear = format(new Date(finance.createdAt), 'MM/yyyy');

        if (!acc[dateMonthYear]) {
          acc[dateMonthYear] = { income: 0, expenses: 0 };
        }

        if (finance.type === "INCOME") {
          acc[dateMonthYear].income += finance.amount;
        } else if (finance.type === "EXPENSE") {
          acc[dateMonthYear].expenses += finance.amount;
        }

        return acc;
      }, {} as Record<string, { income: number; expenses: number }>);

      const processedData: (string | number)[][] = [["Mês", "Rendas", "Despesas"]];
      Object.keys(monthlyData).forEach(dateMonthYear => {
        processedData.push([
          dateMonthYear,
          monthlyData[dateMonthYear].income,
          monthlyData[dateMonthYear].expenses
        ]);
      });

      return processedData;
    };

    const processedData = processFinances(finances);
    if (finances.length === 0) {
      setData([["Mês", "Rendas", "Despesas"], ["Sem dados", 0, 0]]);
    } else {
      setData(processedData);
    }
  }, [finances]);

  const options = {
    chart: {
      title: "Rendas x Despesas",
      subtitle: "Comparativo mensal de Rendas e Despesas",
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

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Rendas x Despesas</h2>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default DashboardChart;
