import React from 'react';
import { ExpenseSummary as ExpenseSummaryType } from '../types';
import { formatCurrency } from '../utils/formatting';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ExpenseSummaryProps {
    summary: ExpenseSummaryType;
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ summary }) => {
    // Prepare data for the category chart
    const categoryChartData = {
        labels: Object.keys(summary.byCategory),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(summary.byCategory),
                backgroundColor: [
                    '#FF5733', '#33A8FF', '#FF33A8', '#A833FF', '#33FFA8',
                    '#3366FF', '#FF9933', '#33FF33', '#9933FF', '#FF3366', '#999999'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Prepare data for the payment method chart
    const paymentMethodChartData = {
        labels: Object.keys(summary.byPaymentMethod),
        datasets: [
            {
                label: 'Expenses by Payment Method',
                data: Object.values(summary.byPaymentMethod),
                backgroundColor: [
                    '#4BC0C0', '#FF6384', '#FFCE56', '#36A2EB', '#9966FF', '#C9CBCF'
                ],
                borderWidth: 1,
            },
        ],
    };

    // Sort month data chronologically
    const sortedMonths = Object.keys(summary.byMonth).sort();

    // Prepare data for the monthly chart
    const monthlyChartData = {
        labels: sortedMonths.map(month => {
            const [year, monthNum] = month.split('-');
            return `${monthNum}/${year.slice(2)}`;
        }),
        datasets: [
            {
                label: 'Expenses by Month',
                data: sortedMonths.map(month => summary.byMonth[month]),
                backgroundColor: '#3366FF',
                borderColor: '#2244CC',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Expense Summary</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">Total Expenses</h3>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(summary.totalAmount)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="h-80">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">By Category</h3>
                    <Bar data={categoryChartData} options={chartOptions} />
                </div>

                <div className="h-80">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">By Payment Method</h3>
                    <Bar data={paymentMethodChartData} options={chartOptions} />
                </div>
            </div>

            <div className="h-80">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Trend</h3>
                <Bar data={monthlyChartData} options={chartOptions} />
            </div>
        </div>
    );
};