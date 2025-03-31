import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';  // Import BarController
import Navbar from './CitizenNavbar';

// Register chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController  // Register the BarController
);

const CrimeStatistics = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Crime data (crime categories with counts)
        const crimeData = [
            { type: 'Burglary', count: 150 },
            { type: 'Assault', count: 120 },
            { type: 'Murder', count: 85 },
            { type: 'Missing Person', count: 95 },
            { type: 'Fraud', count: 60 },
        ];

        // Chart data setup for the Bar chart
        const chartData = {
            labels: crimeData.map(crime => crime.type),  // Crime types as labels
            datasets: [
                {
                    label: 'Crime Counts by Type',
                    data: crimeData.map(crime => crime.count),  // Crime counts for each type
                    backgroundColor: '#4F46E5',  // Color for bars
                    borderColor: '#4F46E5',
                    borderWidth: 1,
                },
            ],
        };

        // Chart options
        const chartOptions = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Crime Statistics Breakdown',
                    font: { size: 20 },
                },
                legend: {
                    display: false, // Hide the legend
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                    },
                },
            },
        };

        // Destroy previous chart if it exists to avoid memory leaks
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Creating the chart instance
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new ChartJS(ctx, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);  // Empty dependency array ensures this effect runs only once after the initial render

    return (
        <div>
             <Navbar />
             <div className="bg-gray-100 min-h-screen py-6 px-8">
            <br />
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Crime Statistics Overview</h1>

            {/* Crime Type Breakdown */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crime Type Breakdown</h2>
                <ul className="grid grid-cols-2 gap-6">
                    {[
                        { type: 'Burglary', count: 150 },
                        { type: 'Assault', count: 120 },
                        { type: 'Murder', count: 85 },
                        { type: 'Missing Person', count: 95 },
                        { type: 'Fraud', count: 60 },
                    ].map((crime, index) => (
                        <li key={index} className="flex justify-between items-center p-4 bg-indigo-100 rounded-lg shadow-md hover:bg-indigo-200 transition-all">
                            <span className="text-lg font-medium text-gray-700">{crime.type}</span>
                            <span className="text-lg font-bold text-indigo-600">{crime.count}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bar Chart */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crime Counts Visualization</h2>
                <canvas ref={chartRef} />
            </div>
        </div>
        </div>
        
    );
};

export default CrimeStatistics;
